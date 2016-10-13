import { getLast } from 'binary-utils';
import createHiddenSeries from './createHiddenSeries';
import getMainSeries from '../utils/getMainSeries';
import barrierIds from '../utils/barriersId';

const getBarriersData = (chart, contract) => {
    const mainSeries = getMainSeries(chart);

    return barrierIds
        .filter(x =>
            contract &&
            contract[x] &&
            !contract.contract_type.includes('DIGIT')
        )
        .sort((a, b) => +contract[a] - +contract[b])
        .map(x =>
            // replicate whole main series to workaround the issue where dragging result in zooming out
            // due to barrier series has too little data
            // TODO: might need to optimize this by using interval
            mainSeries.options.data.map(d => [d[0], +contract[x]])
        );
};

const updateBarrierSeries = (chart, contract) => {
    const barriersData = getBarriersData(chart, contract);

    if (barriersData.length === 0) {
        chart.get('b0').setData([], false);
        chart.get('b1').setData([], false);
        chart.get('b2').setData([], false);
        return;
    }

    while (barriersData.length < 3) {
        barriersData.push(getLast(barriersData));
    }

    barriersData.forEach((b, i) => {
        const correspondingId = `b${i}`;
        const series = chart.get(correspondingId);
        series.setData(b, false);
    });
};

const initBarrier = (chart) => {
    chart.addSeries(createHiddenSeries([], 'b0'));
    chart.addSeries(createHiddenSeries([], 'b1'));
    chart.addSeries(createHiddenSeries([], 'b2'));
};

export default (chart, contract) => {
    const mainSeries = getMainSeries(chart);

    if (!mainSeries) {
        return;
    }

    const b0 = chart.get('b0');

    if (!b0) {
        initBarrier(chart, contract);
    }

    updateBarrierSeries(chart, contract);
};
