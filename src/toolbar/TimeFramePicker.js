import React, { PureComponent } from 'react';

type Props = {
};

export default class TimeFramePicker extends PureComponent {

    props: Props;

    static defaultProps = {
    };

    render() {
        return (
            <div>
                <button value="5m">5M</button>
                <button value="15m">15M</button>
                <button value="1h">1H</button>
                <button value="4hm">4H</button>
                <button value="1d">1D</button>
                <button value="5d">5D</button>
                <button value="max">MAX</button>
            </div>
        );
    }
}
