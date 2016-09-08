import seriesId from '../utils/seriesIdByType';

export default (data: (ChartTick | ChartCandle)[], pipSize: number, type: ChartType, id: string) => [{
    name: 'Spot',
    type,
    data,
    id: id || seriesId(type),
    maxPointWidth: 50,
    minPointLength: 20,
    tooltip: {
        valueDecimals: pipSize,
        zIndex: 120,
    },
    fillOpacity: 0.1,
    threshold: null,
    zoneAxis: 'x',
}];
