export default () => ({
    lineWidth: 1,
    opposite: true,
    labels: {
        align: 'left',
        formatter: function () { return this.value.toFixed(2) }
    }
});
