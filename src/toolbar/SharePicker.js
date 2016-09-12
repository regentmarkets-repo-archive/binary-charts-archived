import React, { PureComponent } from 'react';
import Share from 'react-material-design-icons/icons/Share';
import Picker from './Picker';

type Props = {
    symbolName: string,
    expanded: boolean,
    getChart: () => any,
    onExpand: () => void,
};

export default class SharePicker extends PureComponent {

    props: Props;

    static defaultProps = {
        symbolName: 'Chart',
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
            filename: this.props.symbolName,
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
                img={<Share />}
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
