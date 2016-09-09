import React, { PureComponent } from 'react';
import Picker from './Picker';

export default class SharePicker extends PureComponent {

    props: {
        getChart: () => any,
    };

    static defaultProps = {
    };

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
        return (
            <Picker
                img="https://webtrader.binary.com/v2.1.11/images/share.svg"
                items={[
                    { text: 'Download Image', onPick: this.downloadPng },
                    { text: 'Download PDF', onPick: this.downloadPdf },
                ]}
            />
        );
    }
}
