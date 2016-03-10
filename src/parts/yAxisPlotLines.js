export default () => ({
    plotLines: [{
        value: 12,
        color: 'green',
        dashStyle: 'shortdash',
        width: 2,
        label: {
            text: 'start time',
            style: {
                color: 'green'
            }
        }
    }, {
        value: 20,
        color: 'red',
        dashStyle: 'shortdash',
        width: 2,
        label: {
            text: 'Expiration time',
            style: {
                color: 'red'
            }
        }
    }]
});
