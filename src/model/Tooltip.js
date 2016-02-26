export const createTooltip = (triggerOn, trigger, tooltipFormatter) => ({
    trigger,
    triggerOn,
    formatter: tooltipFormatter,
    position: [10, 40],
    alwaysShowContent: true,
    transitionDuration: 0,
    axisPointer: {
        type: 'line',
        show: true,
        lineStyle: {
            type : 'dashed',
            width : 1
        }
    }
});
