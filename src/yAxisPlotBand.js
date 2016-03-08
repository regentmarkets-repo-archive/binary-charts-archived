export default config =>
    Object.assign(config, {
        yAxis: {
            plotBands: [{
                from: 15,
                to: 20,
                color: 'rgba(68, 170, 213, 0.2)',
                label: {
                    text: 'Last quarter year\'s value range'
                }
            }]
        }
    });
