import digitsToPips from 'binary-utils/lib/digitsToPips';

export default ({ pipSize }) => ({
    opposite: true,
    labels: {
        align: 'left',
        formatter() {
            const updatedPipSize = this.chart.binary ? this.chart.binary.pipSize : 0;
            return this.value.toFixed(updatedPipSize);
        },
    },
    tickWidth: 0,
    title: { text: null },
    floor: 0,
    minTickInterval: digitsToPips(pipSize),
});
