export default (type: ChartType) => {
    switch (type) {
        case 'area':
        case 'line':
            return 'ticks';
        case 'ha':
        case 'ohlc':
        case 'candlestick':
            return 'candles';
        default:
            throw new Error(`Unknown chart type: ${type}`);
    }
};
