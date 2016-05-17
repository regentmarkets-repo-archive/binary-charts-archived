import digitsToPips from 'binary-utils/lib/digitsToPips';

export default ({ pipSize }) => ({
    opposite: true,
    labels: {
        align: 'left',
        formatter() {
            const params = this.chart.options.binary;
            // console.log(params ? params.pipSize : 0);
            return this.value.toFixed(params ? params.pipSize : 0);
        },
    },
    tickWidth: 0,
    title: { text: null },
    floor: 0,
    minTickInterval: digitsToPips(pipSize),
});
