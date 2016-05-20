import updateExtremes from '../config/updateExtremes'

export default ({ rangeChange = () => undefined }) => ({
    type: 'datetime',
    ordinal: false,
    tickWidth: 0,
    startOnTick: false,
    endOnTick: false,
    events: {
        setExtremes: function(e) {
            if (e.rangeSelectorButton) {
                const { count, type } = e.rangeSelectorButton;
                rangeChange(count, type);
            }
        },
        afterSetExtremes: function () {
            const chart = this.chart;
            const ticks = chart.rawTicks;
            const contract = chart.rawContract;
            if (ticks && contract) {
                updateExtremes(chart, ticks, contract);
            }
        }
    },
});
