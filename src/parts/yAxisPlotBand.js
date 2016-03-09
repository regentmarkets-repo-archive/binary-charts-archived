export default (from, to, name) => ({
    plotBands: [{
        from,
        to,
        color: 'rgba(68, 170, 213, 0.2)',
        label: {
            text: name
        }
    }]
});
