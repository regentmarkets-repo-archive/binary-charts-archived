import seriesEvents from './seriesEvents';

type SeriesData = ChartTick[] | ChartCandle[];

export default (
    name: string,
    type: ChartType,
    data: SeriesData,
    pipSize: number,
    id: string,
) => ({
    name,
    type,
    data,
    id: id || 'main',
    // lineWidth: 2,
    // enableMouseTracking: false,
    point: {
        events: seriesEvents(pipSize),
    },
    fillOpacity: 0.1,
    threshold: null,
    zoneAxis: 'x',
    dataGrouping: {
        enabled: true,
    },
});
