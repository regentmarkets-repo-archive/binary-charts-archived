export default (chart: Chart, params: any) => {
    const { type } = params;

    chart.series[0].update({
        type,
    }, false);
};
