import doTicksDifferJustOneEntry from 'binary-utils/lib/doTicksDifferJustOneEntry';
import tickToData from 'binary-utils/lib/tickToData';
import getLastTick from 'binary-utils/lib/getLastTick';

const ohlcToData = d => [+d.epoch, +d.open, +d.high, +d.low, +d.close];

export default (chart, prevProps, nextProps) => {
    const oneTickDiff = doTicksDifferJustOneEntry(prevProps.ticks, nextProps.ticks);
    if (oneTickDiff) {
        const lastTick = getLastTick(nextProps.ticks);
        const dataPoint = chart.series[0].type === 'area' ? tickToData(lastTick) : ohlcToData(lastTick);
        chart.series[0].addPoint(dataPoint);
    } else {
        const dataList =
            chart.series[0].type === 'area' ?
                nextProps.ticks.map(tickToData) :
                nextProps.ticks.map(ohlcToData);
        chart.series[0].setData(dataList);
        chart.redraw();
    }
};
