export default () => ({
    buttons: [{
        type: 'second',
        count: 1,
        text: '1sec'
    }, {
        type: 'hour',
        count: 1,
        text: '1h'
    }, {
        type: 'day',
        count: 1,
        text: '1D'
    }, {
        type: 'all',
        count: 1,
        text: 'All'
    }],
    allButtonsEnabled: true,
    selected: 1,
    inputEnabled: false,
    labelStyle: { display: 'none' }
});
