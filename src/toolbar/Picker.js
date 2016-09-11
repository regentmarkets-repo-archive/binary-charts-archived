import React, { PureComponent } from 'react';
import PickerItem from './PickerItem';
import styles from '../styles';

type Props = {
    text?: string,
    img?: ReactComponent,
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
        const { text, img, items } = this.props;
        const { expanded } = this.state;

        return (
            <div className="binary-chart-picker">
                <button style={styles.pickerButton} className="binary-chart-button" onClick={this.showMenu}>
                    {img}{text}
                </button>
                {expanded &&
                    <div style={styles.submenu} className="binary-chart-submenu">
                        {items.map((x, i) =>
                            <PickerItem key={i} {...x} />
                        )}
                    </div>
                }
            </div>
        );
    }
}
