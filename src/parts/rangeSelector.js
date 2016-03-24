export default () => ({
    buttons: [{
        type: 'second',
        count: 15,
        text: 'Ticks',
    }, {
        type: 'minute',
        count: 1,
        text: '1 Minute',
    }, {
        type: 'minute',
        count: 15,
        text: '15 Minutes',
    }, {
        type: 'hour',
        count: 1,
        text: '1 Hour',
    }, {
        type: 'hour',
        count: 6,
        text: '6 Hours',
    }, {
        type: 'day',
        count: 1,
        text: '1 Day',
    }, {
        type: 'all',
        count: 1,
        text: 'All',
    }],
    allButtonsEnabled: true,
    selected: 1,
    inputEnabled: false,
    labelStyle: { display: 'none' },
});
