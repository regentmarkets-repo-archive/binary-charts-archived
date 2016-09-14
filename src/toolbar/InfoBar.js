import React, { PureComponent } from 'react';
import styles from '../styles';

type Props = {
    assetName: string,
    onHoverChange: (moreData: string) => void,
};

export default class InfoBar extends PureComponent {

    props: Props;

    static defaultProps = {
        assetname: 'Unknown Asset',
    };

    render() {
        const { assetName } = this.props;

        return (
            <div style={styles.infoBar} className="binary-chart-info-bar">
                <div>{assetName}</div>
                <div>O: 771.46  H: 780.08  L: 771.46  C:  780.08</div>
            </div>
        );
    }
}
