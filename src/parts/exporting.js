export default ({ typeChange }) => {
    if (!typeChange) return { enabled: false };

    return {
        buttons: {
            contextButton: {
                enabled: false,
            },
            tickButton: {
                text: 'Ticks',
                onclick: () => typeChange('ticks'),
            },
            ohlcButton: {
                text: 'Candlestick',
                onclick: () => typeChange('candles'),
            },
        },
    };
};
