type PlotBand = {
    id: string,
    from: number,
    to: nnumber,
    color: string,
    label: Object,
}

export const winPlotBand = (id: string, from: number, to: number): PlotBand => ({
    id,
    from,
    to,
    color: 'rgba(46, 136, 54, 0.2)',
    label: {
        text: 'WIN',
        style: {
            fontSize: '25px',
            fontWeight: 'bold',
            color: '#2E8836',
        },
    },
});

export const lossPlotBand = (id: string, from: number, to: number): PlotBand => ({
    id,
    from,
    to,
    color: 'rgba(204, 0, 51, 0.1)',
    label: {
        text: 'LOSS',
        style: {
            fontSize: '25px',
            fontWeight: 'bold',
            color: '#c03',
        },
    },
});
