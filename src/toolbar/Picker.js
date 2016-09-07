import React, { PureComponent } from 'react';
import styles from '../styles';

type PickerItem = {
    img?: string,
    text: string,
}

type Props = {
    items: PickerItem[],
};

type State = {
    expanded: boolean,
}

export default class Picker extends PureComponent {

    props: Props;
    state: State;

    defaultProps = {
        items: [],
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            expanded: false,
        };
    }

    showMenu = () =>
        this.setState({ expanded: !this.state.expanded });

    render() {
        const { items } = this.props;
        const { expanded } = this.state;

        return (
            <div className="binary-chart-picker">
                <div style={styles.pickerButton} className="binary-chart-button" onClick={this.showMenu}>MENU</div>
                {expanded &&
                    <div>
                        {items.map(x =>
                            <div
                                key={x.text}
                                style={styles.pickerItem}
                                className="binary-chart-picker-item"
                                onClick={x.onPick}
                            >
                                {x.text}
                            </div>
                        )}
                    </div>
                }
            </div>
        );
    }
}
