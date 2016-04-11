export default (id, epoch, color, text, position) => ({
    id,
    value: epoch * 1000,
    color,
    width: 2,
    label: {
        text,
        rotation: position === 'left' ? 270 : 90,
        x: position === 'left' ? -5 : 5,
        textAlign: position === 'left' ? 'right' : 'left',
        verticalAlign: 'top',
        style: {
            color,
        },
    },
});
