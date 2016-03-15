export const updateConfig = ({ chart, contract, trade }) => {
    chart.yAxis.update({ plotBands: plotBandsForContractAndTrade(contract || trade) });
    if (contract) {
        chart.xAxis.update({ plotLines: plotLinesForContract(contract) });
    }
}
