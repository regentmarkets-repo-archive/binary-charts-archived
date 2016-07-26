export default (chart, oldTypeChange, newTypeChange) => {
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
