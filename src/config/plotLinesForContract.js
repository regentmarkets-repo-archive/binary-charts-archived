import dateEntryPlotLines from '../plot-lines/dateEntryPlotLines';

export default contract =>
    contract ? dateEntryPlotLines(contract) : [];
