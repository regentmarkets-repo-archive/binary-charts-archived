export default ({ typeChange }) => {
    if (typeChange) {
        return {
            buttons: {
                contextButton: {
                    enabled: false
                },
                tickButton: {
                    text: 'Ticks',
                    onclick: () => typeChange('tick')
                },
                ohlcButton: {
                    text: 'Candlestick',
                    onclick: () => typeChange('candlestick')
                }
            }
        };
    }
    return { enabled: false };
}
