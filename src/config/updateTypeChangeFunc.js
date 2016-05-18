import exporting from '../parts/exporting';

export default (chart, oldTypeChange, newTypeChange) => {
    if (oldTypeChange !== newTypeChange) {
        chart.options.exporting = exporting({ typeChange: newTypeChange });
    }
};
