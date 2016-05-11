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
                // updateExtremesYAxis(e.chart.yAxis[0], contract, lastTick);
            }
        },
    },
});
