import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';

class RemoveTypeChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fn: () => {},
            nodata: false,
        };
    }

    removeTypeChange = () => this.setState({ fn: undefined });
    toggleNoData = () => {
        const { nodata } = this.state;
        this.setState({ nodata: !nodata });
    }

    render() {
        const { fn, nodata } = this.state;
        return (
            <div>
                <BinaryChart typeChange={fn} noData={nodata}/>
                <button onClick={this.removeTypeChange}>Remove type change button</button>
                <button onClick={this.toggleNoData}>Toggle no data</button>
            </div>
        )
    }
}

storiesOf('Disable type change at run time', module)
    .add('', () => <RemoveTypeChange />)
