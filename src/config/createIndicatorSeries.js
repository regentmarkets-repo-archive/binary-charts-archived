type SeriesData = ChartTick[] | ChartCandle[];

export default (
    name: string,
    data: SeriesData,
    id: string,
) => ({
    name,
    data,
    id: id,
    enableMouseTracking: false,
    fillOpacity: 0.1,
    lineWidth: 0.5,
    threshold: null,
    zoneAxis: 'x',
    dataGrouping: {
        enabled: true,
    },
    type: 'line',
});

