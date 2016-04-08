export default () => ({
    lineWidth: 1,
    opposite: true,
    labels: {
        align: 'left',
        formatter() { return this.value.toFixed(2); },
    },
    title: {
        text: null,
    },
});
