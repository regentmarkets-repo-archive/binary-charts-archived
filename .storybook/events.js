import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';
import ticks from './ticks';

const colors = ['red', 'blue', 'green', 'yellow'];

const colorEvent = new Event('color');

let colorIndex = 0;

function colorHandler(chart) {
    // console.log('t', this);
    chart.series[0].update({ fillColor: colors[colorIndex] });
    colorIndex = (colorIndex + 1) % 4;
}

const events = [
    {
        type: 'color',
        handler: colorHandler,
    },
];

function changeColor() {
    document.getElementById('color-chart').dispatchEvent(colorEvent);
}

class SymbolChangingChart extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            symbol: 'A',
        };
    }

    render() {
        const { symbol } = this.state;
        return (
            <div>
                <BinaryChart id="color-chart" symbol={symbol} ticks={ticks} events={events} />
                <button onClick={changeColor}>Change color</button>
                <button onClick={() => { this.setState({ symbol: symbol + '1' })}}>Change symbol</button>
            </div>
        );
    }
}

storiesOf('Events', module)
    .add('Change color', () => <SymbolChangingChart />);
