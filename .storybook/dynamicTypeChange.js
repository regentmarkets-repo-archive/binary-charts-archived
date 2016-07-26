import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';

class RemoveTypeChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fn: () => {}
        };
    }

    removeTypeChange = () => this.setState({ fn: undefined });

    render() {
        return (
            <div>
                <BinaryChart typeChange={this.state.fn}/>
                <button onClick={this.removeTypeChange}>Remove</button>
            </div>
        )
    }
}

storiesOf('Disable type change at run time', module)
    .add('', () => <RemoveTypeChange />)
