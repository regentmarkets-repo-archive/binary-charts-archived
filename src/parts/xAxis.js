export default () => ({
    type: 'datetime',
    dateTimeLabelFormats: {
        millisecond: ['%A, %b %e, %H:%M:%S.%L GMT', '%A, %b %e, %H:%M:%S.%L', '-%H:%M:%S.%L GMT'],
        second: ['%A, %b %e, %H:%M:%S GMT', '%A, %b %e, %H:%M:%S', '-%H:%M:%S GMT'],
        minute: ['%A, %b %e, %H:%M GMT', '%A, %b %e, %H:%M', '-%H:%M GMT'],
        hour: ['%A, %b %e, %H:%M GMT', '%A, %b %e, %H:%M', '-%H:%M GMT'],
        day: ['%A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
        week: ['Week from %A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
        month: ['%B %Y', '%B', '-%B %Y'],
        year: ['%Y', '%Y', '-%Y'],
    },
    tickWidth: 0,
});
