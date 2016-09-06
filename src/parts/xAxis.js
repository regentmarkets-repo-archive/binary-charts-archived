import updateExtremes, { updateExtremesYAxis } from '../config/updateExtremes';

export default (onRangeChange: Function) => ({
    type: 'datetime',
    ordinal: true,
    tickWidth: 0,
    startOnTick: false,
    minRange: 1000,
    endOnTick: false,
    crosshair: false,
    events: {
        setExtremes: function setExtremesHandler(e: SetExtremesEvent) {          // eslint-disable-line object-shorthand
            if (e.rangeSelectorButton) {
                const chart = this.chart;

                const { count, type } = e.rangeSelectorButton;
                if (chart.isLoading) {
                    return;
                }
                const asyncResult = onRangeChange(count, type);

                // a hack so that we can set x-extremes correctly after data is loaded
                // works best if onRangeChange is only fire when needed.
                if (asyncResult.then) {
                    chart.showLoading();
                    asyncResult.then(() => {
                        chart.hideLoading();
                        updateExtremes(chart, chart.userOptions.binary.contract, e.rangeSelectorButton);
                    });
                }
            }
        },
        afterSetExtremes: function afterSetExtremesHandler(e: SetExtremesEvent) { // eslint-disable-line object-shorthand
            const chart = this.chart;

            const triggerByRangeSelector = e.trigger === 'rangeSelectorButton';

            const { contract } = chart.userOptions.binary;
            let toRedraw = false;

            if (triggerByRangeSelector) {
                updateExtremes(chart, contract, e.rangeSelectorButton);
                toRedraw = true;
            } else if (contract) {
                updateExtremesYAxis(chart, contract);
                toRedraw = true;
            }

            if (toRedraw) chart.redraw();
        },
    },
});
