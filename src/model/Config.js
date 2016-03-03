const seriesConfig = (a = {
    width: width = 2,
    color: color = 'green',
    areaColor: areaColor = 'blue',
    areaOpacity: areaOpacity = 0.2,
    labelColor: labelColor = 'red',
    labelFontSize: labelFontSize = 12,
    labelTextColor: labelTextColor = 'white'
} = {}) => a;

const RiseFallConfig = {
    mainSeries: seriesConfig({
        width: 2,
        color: 'green',
        areaColor: 'blue',
    }),
    contractSeries: seriesConfig({
        width: 2,
        color: 'orange',
        areaColor: 'orange',
        areaOpacity: 0.2,

    }),
    currentSpotSeries: seriesConfig({
        width: 2,
        color: 'orange'
    }),

};
