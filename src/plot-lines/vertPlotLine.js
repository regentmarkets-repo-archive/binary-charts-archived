import { colorBg } from '../themes';

export default (id: string, epoch: number, text: string, position: 'left' | 'right', theme: Theme): PlotObject => ({
    id,
    value: epoch * 1000,
    color: colorBg(theme, 0.5),
//    dashStyle: 'longdash',
    width: 1,
    label: {
        text,
        rotation: position === 'left' ? 270 : 90,
        x: position === 'left' ? -5 : 5,
        textAlign: position === 'left' ? 'right' : 'left',
        verticalAlign: 'top',
        style: {
            color: colorBg(theme, 1),
            fontWeight: 'bold',
            letterSpacing: '.2px',
        },
    },
});
