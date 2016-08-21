import { digitsToPips } from 'binary-utils';

export default ({ pipSize: number }) => ({
    opposite: true,
    labels: {
        align: 'left',
        formatter() {
            const updatedPipSize = this.chart.userOptions.binary.pipSize;
            return this.value.toFixed(updatedPipSize);
        },
    },
    tickWidth: 0,
    title: { text: null },
    floor: 0,
    minTickInterval: digitsToPips(pipSize),
});
