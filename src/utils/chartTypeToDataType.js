export default (type: ChartType) => {
    switch (type) {
        case 'area':
        case 'line':
            return 'tick';
        case 'ohlc':
        case 'candlestick':
            return 'ohlc';
        default:
            throw new Error(`Unknown chart type: ${type}`);
    }
};
