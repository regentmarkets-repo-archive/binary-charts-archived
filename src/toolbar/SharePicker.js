import React, { PureComponent } from 'react';
import { ShareIcon } from '../icons';
import Picker from './Picker';

type Props = {
    assetName: string,
    expanded: boolean,
    getChart: () => any,
    onExpand: () => void,
};

export default class SharePicker extends PureComponent {

    props: Props;

    static defaultProps = {
        assetName: 'Chart',
    };

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
            filename: this.props.assetName,
        });
    };

    downloadPng = () => this.download('image/png');

    downloadSvg = () => this.download('image/svg+xml');

    downloadPdf = () => this.download('application/pdf');

    onDownload = downloadFunc => downloadFunc();

    render() {
        const { expanded, onExpand } = this.props;

        return (
            <Picker
                expanded={expanded}
                img={<ShareIcon />}
                items={[
                    { text: 'Download PNG Image', value: this.downloadPng },
                    { text: 'Download SVG Image', value: this.downloadSvg },
                    { text: 'Download PDF Document', value: this.downloadPdf },
                ]}
                onExpand={onExpand}
                onChange={this.onDownload}
            />
        );
    }
}
