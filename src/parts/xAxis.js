import updateExtremes from '../config/updateExtremes';

export default ({ rangeChange = () => undefined }) => ({
    type: 'datetime',
    ordinal: false,
    tickWidth: 0,
    startOnTick: false,
    endOnTick: false,
    events: {
        setExtremes: e => {
            if (e.rangeSelectorButton) {
                const { count, type } = e.rangeSelectorButton;
                rangeChange(count, type);
            }
        },
        afterSetExtremes: function handler() { // eslint-disable-line object-shorthand
            const chart = this.chart;
            if (!chart.binary) {
                return;
            }

            const { ticks, contract } = chart.binary;
            if (ticks && contract) {
                updateExtremes(chart, ticks, contract);
            }
        },
    },
});
