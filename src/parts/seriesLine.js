import seriesId from '../utils/seriesIdByType';

export default (data: (ChartTick | ChartCandle)[], pipSize: number, type: ChartType) => [{
    name: 'Spot',
    type,
    data,
    id: seriesId(type),
    tooltip: {
        valueDecimals: pipSize,
        zIndex: 120,
    },
    fillOpacity: 0.1,
    threshold: null,
    zoneAxis: 'x',
}];
