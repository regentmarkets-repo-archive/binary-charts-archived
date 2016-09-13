export default (data: ChartTick, id: string) => ({
    name,
    type: 'line',
    data,
    id,
    lineWidth: 0,
    enableMouseTracking: false,
});
