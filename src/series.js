export default (config, data) =>
    Object.assign(config, {
        series: [{
            name: 'Something',
            data,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
