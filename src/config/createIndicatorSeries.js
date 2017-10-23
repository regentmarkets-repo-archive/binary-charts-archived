type SeriesData = ChartTick[] | ChartCandle[];

export default (
    name: string,
    data: SeriesData,
    id: string,
) => ({
    name,
    data,
    id,
    enableMouseTracking: false,
    fillOpacity: 0.1,
    lineWidth: 1.5,
    threshold: null,
    zoneAxis: 'x',
    dataGrouping: {
        enabled: false,
    },
    type: 'line',
});
