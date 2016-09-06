export default (type: ChartType) => {
    switch (type) {
        case 'area':
        case 'line':
            return 'tick';
        case 'ohlc':
        case 'candlestick':
            return 'ohlc';
    }
};
