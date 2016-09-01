export default (chart: Chart, oldTypeChange: Function, newTypeChange: Function) => {
    const exportElements = chart.exportSVGElements;
    if (!exportElements || oldTypeChange === newTypeChange) {
        return;
    }
    if (newTypeChange === undefined) {
        exportElements.forEach(e => e.hide());
    } else {
        exportElements.forEach(e => e.show());
    }
};
