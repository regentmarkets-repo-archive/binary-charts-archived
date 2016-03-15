export const winPlotBand = (id, from, to) => ({
    id,
    from,
    to,
    color: 'rgba(0, 255, 0, 0.1)',
    label: {
        text: 'Win',
        style: {
            color: 'rgba(0, 255, 0, 1)'
        }
    }
});

export const lossPlotBand = (id, from, to) => ({
    from,
    to,
    color: 'rgba(255, 0, 0, 0.1)',
    label: {
        text: 'Loss',
        style: {
            color: 'rgba(255, 0, 0, 1)'
        }
    }
});
