export default (chart, params) => {
    const { pipSize } = params;
    chart.update({
        binary: {
            pipSize,
        },
    });
    // chart.redraw();
};
