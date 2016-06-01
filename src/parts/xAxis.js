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

                // Do not call rangeChange if it is triggered by code, instead of user
                if (chart.binary.rangeSelectedProgrammatically) {
                    chart.binary.rangeSelectedProgrammatically = false;
                    return;
                }

                const { count, type, text } = e.rangeSelectorButton;
                const asyncResult = rangeChange(count, type);

                // a hack so that we can set x-extremes correctly after data is loaded
                // works best if rangechange is only fire when needed.
                if (asyncResult.then) {
                    const buttonID = buttons.findIndex(button => button.text === text);
                    asyncResult.then(() => {
                        chart.binary.rangeSelectedProgrammatically = true;
                        chart.rangeSelector.clickButton(buttonID, e.rangeSelectorButton, true);
                    });
                }
            }
        },
        afterSetExtremes: function afterSetExtremesHandler() { // eslint-disable-line object-shorthand
            const chart = this.chart;
            if (!chart.binary) {
                return;
            }

            const { ticks, contract } = chart.binary;
            if (ticks && contract) {
                updateExtremes(chart, ticks, contract);
                chart.redraw();
            }
        },
    },
});
