import React, { PureComponent } from 'react';
import PickerItem from './PickerItem';
import styles from '../styles';

type Props = {
    text?: string,
    expanded: boolean,
    img?: ReactComponent,
    items: PickerItem[],
    onExpand: () => void,
    onChange: (value: any) => void,
};

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

    expand = (e: SyntheticEvent) => {
        this.props.onExpand(e);
        e.stopPropagation();
    }

    render() {
        const { expanded, text, img, items, onChange } = this.props;

        return (
            <div className="binary-chart-picker">
                <button
                    style={styles.pickerButton}
                    className="binary-chart-button"
                    onClick={this.expand}
                >
                    {img}
                    {text && <span>{text}</span>}
                </button>
                {expanded &&
                    <div style={styles.submenu} className="binary-chart-submenu">
                        {items.map((x, i) =>
                            <PickerItem key={i} {...x} onClick={onChange} />
                        )}
                    </div>
                }
            </div>
        );
    }
}
