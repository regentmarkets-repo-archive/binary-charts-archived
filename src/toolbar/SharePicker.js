import React, { PureComponent } from 'react';
import Share from 'react-material-design-icons/icons/Share';
import Picker from './Picker';

type Props = {
    expanded: boolean,
    getChart: () => any,
    onExpand: () => void,
};

export default class SharePicker extends PureComponent {

    props: Props;

    constructor(props: Props) {
        super(props);

        this.state = {
            expanded: false,
        };
    }

    showMenu = () =>
        this.setState({ expanded: !this.state.expanded });

    download = (type: string) => {
        const chart = this.props.getChart();
        chart.exportChart({
            type,
            filename: 'chart',
        });
    };

    downloadPng = () =>
        this.download('image/png');

    downloadPdf = () =>
        this.download('application/pdf');

    render() {
        const { expanded, onExpand } = this.props;

        return (
            <Picker
                expanded={expanded}
                img={<Share />}
                items={[
                    { text: 'Download Image', onPick: this.downloadPng },
                    { text: 'Download PDF', onPick: this.downloadPdf },
                ]}
                onExpand={onExpand}
            />
        );
    }
}
