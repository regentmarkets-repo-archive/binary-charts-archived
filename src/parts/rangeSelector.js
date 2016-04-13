export default () => ({
    buttons: [{
        type: 'second',
        count: 15,
        text: 'TICK',
    }, {
        type: 'minute',
        count: 1,
        text: '1M',
    }, {
        type: 'minute',
        count: 15,
        text: '15M',
    }, {
        type: 'hour',
        count: 1,
        text: '1H',
    }, {
        type: 'hour',
        count: 6,
        text: '6H',
    }, {
        type: 'day',
        count: 1,
        text: '1D',
    }, {
        type: 'all',
        count: 1,
        text: 'MAX',
    }],
    allButtonsEnabled: true,
    selected: 1,
    inputEnabled: false,
    labelStyle: { display: 'none' },
});
