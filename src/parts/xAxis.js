import updateExtremes from '../config/updateExtremes';
import { buttons } from './rangeSelector';

export default ({ rangeChange = () => undefined }) => ({
    type: 'datetime',
    ordinal: false,
    tickWidth: 0,
    startOnTick: false,
    endOnTick: false,
    events: {
        setExtremes: function setExtremesHandler(e) {          // eslint-disable-line object-shorthand
            if (e.rangeSelectorButton) {
                const chart = this.chart;

                const { count, type, text } = e.rangeSelectorButton;
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

            if (!chart.binary) {
                return;
            }

            const { ticks, contract } = chart.binary;
            if (ticks && contract) {
                updateExtremes(chart, ticks, contract);
            }

            if (e.trigger === 'rangeSelectorButton') {
                chart.redraw();
            }
        },
    },
});
