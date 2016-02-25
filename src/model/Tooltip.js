export const createTooltip = (triggerOn, trigger, tooltipFormatter) => ({
    trigger,
    triggerOn,
    formatter: tooltipFormatter,
    axisPointer: {
        type: 'line',
        show: true,
        lineStyle: {
            type : 'dashed',
            width : 1
        }
    }
});
