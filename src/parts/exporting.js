export default ({ typeChange }) => {
    if (!typeChange) return { enabled: false };

    return {
        buttons: {
            contextButton: {
                enabled: false,
            },
            tickButton: {
                symbol: 'url(https://app.binary.com/img/chart-area.svg)',
                onclick: function () {
                    const chart = this;
                    chart.showLoading();
                    const result = typeChange('area');
                    if (result.then) {
                        result.then(() => chart.hideLoading());
                    }
                },
            },
            ohlcButton: {
                symbol: 'url(https://app.binary.com/img/chart-ohlc.svg)',
                onclick: function () {
                    const chart = this;
                    chart.showLoading();
                    const result = typeChange('candlestick');
                    if (result.then) {
                        result.then(() => chart.hideLoading());
                    }
                },
            },
        },
    };
};
