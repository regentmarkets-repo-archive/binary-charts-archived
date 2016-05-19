export default ({ typeChange }) => {
    if (!typeChange) return { enabled: false };

    return {
        buttons: {
            contextButton: {
                enabled: false,
            },
            tickButton: {
                symbol: 'url(http://localhost:3000/img/chart-area.svg)',
                onclick: () => typeChange('ticks'),
            },
            ohlcButton: {
                symbol: 'url(http://localhost:3000/img/chart-ohlc.svg)',
                onclick: () => typeChange('candles'),
            },
        },
    };
};
