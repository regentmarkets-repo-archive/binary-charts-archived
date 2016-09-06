import chartTypeToDataType from '../utils/chartTypeToDataType';
import getSeriesByType from '../utils/getSeriesByType';

export default (chart: Chart, newType) => {
    const dataType = chartTypeToDataType(newType);
    const mainTickSeries = getSeriesByType(chart, 'line');
    const mainOhlcSeries = getSeriesByType(chart, 'ohlc');

    switch (dataType) {
        case 'tick':
            if (mainOhlcSeries) mainOhlcSeries.hide();
            if (mainTickSeries) {
                mainTickSeries.show();
                mainTickSeries.update({ type: newType }, false);
            }
            break;
        case 'ohlc':
            if (mainTickSeries) mainTickSeries.hide();
            if (mainOhlcSeries) {
                mainOhlcSeries.show();
                mainOhlcSeries.update({ type: newType }, false);
            }
            break;
        default: throw new Error(`Unknown data type: ${dataType}`);
    }
};
