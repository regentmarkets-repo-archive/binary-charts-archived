import React, { PureComponent } from 'react';
import PickerItem from './PickerItem';
import styles from '../styles';

type Props = {
    expanded: boolean,
    img?: ReactComponent,
    items: PickerItem[],
    onExpand: () => void,
    onChange: (value: any) => void,
    propagateEvent: boolean,        // disable event propagation on picker for multiple click interaction, eg select multiple options
    text?: string,
    tooltip?: string,
};

export default class Picker extends PureComponent {

    props: Props;
    state: State;

    static defaultProps = {
        items: [],
        propagateEvent: true,
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
        const { expanded, text, tooltip, img, items, onChange, propagateEvent } = this.props;

        return (
            <div className="binary-chart-picker">
                <a
                    style={styles.pickerButton}
                    className="binary-chart-button"
                    onClick={this.expand}
                >
                    {img}
                    {text && <span>{text}</span>}
                </a>
                {tooltip && <div className="tooltip">{tooltip}</div>}
                {expanded &&
                    <div style={styles.submenu} className="binary-chart-submenu">
                        {items.map((x, i) =>
                            <PickerItem key={i} {...x} onClick={onChange} propagateEvent={propagateEvent} />
                        )}
                    </div>
                }
            </div>
        );
    }
}
