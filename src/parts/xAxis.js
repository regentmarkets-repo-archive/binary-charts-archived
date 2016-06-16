import updateExtremes, { updateExtremesYAxis } from '../config/updateExtremes';
import { buttons } from './rangeSelector';

export default ({ rangeChange = () => ({}) }) => ({
    type: 'datetime',
    ordinal: true,
    tickWidth: 0,
    startOnTick: false,
    minRange: 1000,
    endOnTick: false,
    events: {
        setExtremes: function setExtremesHandler(e) {          // eslint-disable-line object-shorthand
            if (e.rangeSelectorButton) {
                const chart = this.chart;

                const { count, type, text } = e.rangeSelectorButton;
                if (chart.isLoading) {
                    return;
                }
                const asyncResult = rangeChange(count, type);

                // a hack so that we can set x-extremes correctly after data is loaded
                // works best if rangechange is only fire when needed.
                if (asyncResult.then) {
                    chart.showLoading();
                    const buttonID = buttons.findIndex(button => button.text === text);
                    asyncResult.then(() => {
                        chart.hideLoading();
                        chart.rangeSelector.clickButton(buttonID, e.rangeSelectorButton, true);
                    });
                }
            }
        },
        afterSetExtremes: function afterSetExtremesHandler(e) { // eslint-disable-line object-shorthand
            const chart = this.chart;

            const triggerByRangeSelector = e.trigger === 'rangeSelectorButton';

            const { contract } = chart.userOptions.binary;
            let toRedraw = false;
            if (contract) {
                updateExtremesYAxis(chart, contract);
                toRedraw = true;
            }

            if (triggerByRangeSelector) {
                updateExtremes(chart, contract);
                toRedraw = true;
            }

            if (toRedraw) chart.redraw();
        },
    },
});
