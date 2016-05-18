export default (chart, oldRangeChange, newRangeChange) => {
    if (oldRangeChange !== newRangeChange) {
        chart.xAxis[0].update({
            events: {
                setExtremes: e => {
                    if (e.rangeSelectorButton) {
                        const { count, type } = e.rangeSelectorButton;
                        newRangeChange(count, type);
                        // updateExtremesYAxis(e.chart.yAxis[0], contract, lastTick);
                    }
                },
            },
        }, false);
    }
}
