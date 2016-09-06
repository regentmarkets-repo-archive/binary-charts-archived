export default (height: number, width: number, noData: boolean) => ({
    animation: false,
    scrollbar: { enabled: false },
    credits: { enabled: false },
    legend: { enabled: false },
    title: { text: null },
    noData: {
        style: noData ? {} : { display: 'none' },
    },
    chart: {
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        height,
        width,
        events: {
            load: function onLoad() { // eslint-disable-line object-shorthand
                this.xAxis[0].chart = this;
            },
        },
    },
    plotOptions: {
        series: {
            connectNulls: true,
            marker: {
                enabled: false,
            },
            turboThreshold: 3000,
        },
    },
    exporting: {
        enabled: false,
    },
});
