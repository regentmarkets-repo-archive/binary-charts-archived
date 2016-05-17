export default (chart, params) => {
    const { pipSize } = params;

    chart.series[0].update({
        binary: {
            pipSize,
        },
    });
};
