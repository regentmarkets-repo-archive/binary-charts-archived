export const winPlotBand = (id, from, to) => ({
    id,
    from,
    to,
    color: 'rgba(0, 255, 0, 0.05)',
    label: {
        text: 'Win',
        style: {
            fontSize: '25px',
            fontWeight: 'bold',
            color: 'rgba(0, 255, 0, 0.5)',
        },
    },
});

export const lossPlotBand = (id, from, to) => ({
    id,
    from,
    to,
    color: 'rgba(255, 0, 0, 0.05)',
    label: {
        text: 'Loss',
        style: {
            fontSize: '25px',
            fontWeight: 'bold',
            color: 'rgba(255, 0, 0, 0.5)',
        },
    },
});
