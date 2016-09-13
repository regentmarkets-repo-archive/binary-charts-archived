import seriesId from '../utils/seriesIdByType';

type SeriesData = ChartTick[] | ChartCandle[];

export default (
    name: string = 'Spot',
    type: ChartType,
    data: SeriesData,
    pipSize: number,
    id: string,
) => ({
    name,
    type,
    data,
    id: id || seriesId(type),
    lineWidth: 2,
    tooltip: {
        valueDecimals: pipSize,
        zIndex: 120,
    },
    fillOpacity: 0.1,
    threshold: null,
    zoneAxis: 'x',
    dataGrouping: {
        enabled: false,
    },
});
