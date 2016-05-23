export default (chart, params) => {
    const { type, pipSize } = params;

    chart.binary.pipSize = pipSize;

    chart.series[0].update({
        type,
    }, false);
};
