import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';
import ticks from './ticks';

const colors = ['red', 'blue', 'green', 'yellow'];

const colorEvent = new Event('color');

let colorIndex = 0;
const colorHandler = chart => {
    chart.series[0].update({ fillColor: colors[colorIndex] });
    colorIndex = (colorIndex + 1) % 4;
};

const events = [
    {
        type: 'color',
        handler: colorHandler,
    },
];

function changeColor() {
    document.getElementById('color-chart').dispatchEvent(colorEvent);
}

storiesOf('Events', module)
    .add('Change color', () => {
        return (
            <div>
                <BinaryChart id="color-chart" ticks={ticks} events={events} />
                <button onClick={changeColor}>Change color</button>
            </div>
        )
    });
