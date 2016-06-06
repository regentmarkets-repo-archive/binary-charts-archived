export default (chart, params) => {
    const { type } = params;

    chart.series[0].update({
        type,
    }, false);
};
