export default (typeChange: Function) => {
    if (!typeChange) return { enabled: false };

    return {
        buttons: {
            contextButton: {
                enabled: false,
            },
            tickButton: {
                symbol: 'url(https://app.binary.com/img/chart-area.svg)',
                onclick: function changeToTick() {                      // eslint-disable-line object-shorthand
                    const chart = this;
                    if (chart.isLoading) {
                        return;
                    }
                    const result = typeChange('area');
                    if (result && result.then) {    // show loading msg if typechange function return promise
                        chart.showLoading();
                        result.then(() => chart.hideLoading());
                    }
                },
                y: 7,
            },
            ohlcButton: {
                symbol: 'url(https://app.binary.com/img/chart-ohlc.svg)',
                onclick: function changeToOHLC() {                      // eslint-disable-line object-shorthand
                    const chart = this;
                    if (chart.isLoading) {
                        return;
                    }
                    const result = typeChange('candlestick');
                    if (result && result.then) {
                        chart.showLoading();
                        result.then(() => chart.hideLoading());
                    }
                },
                y: 7,
            },
        },
    };
};
