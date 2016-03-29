export default () => ({
    type: 'datetime',
    dateTimeLabelFormats: {
        second: '%Y-%m-%d<br/>%H:%M:%S',
        minute: '%Y-%m-%d<br/>%H:%M',
        hour: '%Y-%m-%d<br/>%H:%M',
        day: '%Y<br/>%m-%d',
        week: '%Y<br/>%m-%d',
        month: '%Y-%m',
        year: '%Y',
    },
    tickWidth: 0,
});
