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
    id: id || 'main',
    // lineWidth: 2,
    // enableMouseTracking: false,
    tooltip: {
        valueDecimals: pipSize,
        pointFormat: '<div style="font-size: 15px; font-weigth: bold">{series.name}</div>' +
            (type === 'line' || type === 'area' ?
                'Value: {point.y}' :
                'Open: {point.open}<br />High: {point.high}<br />Low: {point.low}<br />Close: {point.close}'),
    },

    fillOpacity: 0.1,
    threshold: null,
    zoneAxis: 'x',
    dataGrouping: {
        enabled: type === 'line' || type === 'area',
    },
});
