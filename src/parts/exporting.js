export default ({ typeChange }) => {
    if (!typeChange) return { enabled: false };

    return {
        buttons: {
            contextButton: {
                enabled: false,
            },
            tickButton: {
                text: 'Ticks',
                onclick: () => typeChange('tick'),
            },
            ohlcButton: {
                text: 'Candlestick',
                onclick: () => typeChange('candlestick'),
            },
        },
    };
};
