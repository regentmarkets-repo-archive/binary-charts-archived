import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';

let last = 30;
const randomNum = () => {
    const out = Math.abs(Math.random()) * 100 + last;
    last = out;
    return out;
};

const testData = () =>
    [6, 5, 4, 3, 2, 1].map(i => {
        const epoch = (new Date().getTime() / 1000) - i;
        return { epoch, quote: randomNum() };
    });

export default class TwoDynamicChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticks: testData(),
        };
    }

    componentDidMount() {
        this.chartUpdate = setInterval(() => {
            const { ticks } = this.state;
            const newTick = { epoch: new Date().getTime() / 1000, quote: randomNum() };
            this.setState({
                ticks: ticks.concat([newTick]),
            });
        }, 1000);
        window.stopUpdates = () => clearInterval(this.chartUpdate);
    }

    componentWillUnmount() {
        clearInterval(this.chartUpdate);
    }

    render() {
        const { ticks } = this.state;

        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <BinaryChart ticks={ticks} {...this.props} />
                <BinaryChart ticks={ticks} {...this.props} />
            </div>
        );
    }
}


storiesOf('Multiple', module)
    .add('Two static charts', () =>
        <div>
            <BinaryChart
                symbol="symbol"
                ticks={[
                    { epoch: 0, quote: 50.021 },
                    { epoch: 1, quote: 40.222 },
                    { epoch: 5, quote: 20.333 },
                    { epoch: 6, quote: 30.444 },
                ]}
                pipSize={2}
            />
            <BinaryChart
                symbol="symbol"
                ticks={[
                    { epoch: 0, quote: 50.021 },
                    { epoch: 1, quote: 40.222 },
                    { epoch: 5, quote: 20.333 },
                    { epoch: 6, quote: 30.444 },
                ]}
                pipSize={2}
            />
        </div>
    )
    .add('Two dynamic charts', () =>
        <TwoDynamicChart />
    );
