export const createTooltip = ({triggerOn, trigger, tooltipFormatter, width: width = 700, height: height = 400}) => ({
    trigger,
    triggerOn,
    formatter: tooltipFormatter,
    position: [10, 10],
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
