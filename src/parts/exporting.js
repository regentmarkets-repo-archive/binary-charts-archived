export default ({ typeChange }) => {
    if (!typeChange) return { enabled: false };

    return {
        buttons: {
            contextButton: {
                enabled: false,
            },
            tickButton: {
                symbol: 'url(https://app.binary.com/img/chart-area.svg)',
                onclick: () => typeChange('area'),
            },
            ohlcButton: {
                symbol: 'url(https://app.binary.com/img/chart-ohlc.svg)',
                onclick: () => typeChange('candlestick'),
            },
        },
    };
};
