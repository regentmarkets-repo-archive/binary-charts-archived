export const winPlotBand = (from, to) => ({
    id: 'barrier-band',
    from,
    to,
    color: 'rgba(0, 255, 0, 0.1)',
    label: {
        text: 'Win',
        style: {
            fontSize: '25px',
            fontWeight: 'bold',
            color: 'rgba(0, 255, 0, .5)',
        },
    },
});

export const lossPlotBand = (from, to) => ({
    id: 'barrier-band',
    from,
    to,
    color: 'rgba(255, 0, 0, 0.1)',
    label: {
        text: 'Loss',
        style: {
            fontSize: '25px',
            fontWeight: 'bold',
            color: 'rgba(255, 0, 0, .5)',
        },
    },
});
