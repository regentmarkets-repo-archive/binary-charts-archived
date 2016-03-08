export default config =>
    Object.assign(config, {
        yAxis: [{
            lineWidth: 1,
            opposite: true,
            labels: {
                align: 'right',
                x: 5
            }
        }]
    });
