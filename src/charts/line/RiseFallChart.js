import React, { Component, PropTypes } from 'react';
import * as ld from '../../model/LineData';

export default class RiseFallChart extends Component {
    constructor(props) {
        super(props);
        if (props.data) {
            const d0 = props.data[0];
            const dn = props.data[props.data.length - 1];
            this.setState({xMin: d0[0], xMax: dn[0]});
        }
    }

    static propTypes = {
        data: PropTypes.array,
        contractEntry: PropTypes.array,
        contractExit: PropTypes.array,
    };

    static entryPointFormatter = 'Enter at: {b} \n Point: {c}';
    static exitPointFormatter = 'Exit at: {b} \n Point: {c}';
    static entryPriceFormatter = '{c}';

    updateXMinMax(xMin, xMax) {
        this.seState({xMin, xMax});
    }

    render() {
        const {data, contractEntry, contractExit} = this.props;
        const {xMin, xMax} = this.state;
        const entryPoint = {at: contractEntry, name: 'Entry spot', formatter: RiseFallChart.entryPointFormatter};
        const exitPoint = {at: contractExit, name: 'Exit spot', formatter: RiseFallChart.exitPointFormatter};
        const entrySpotLine = {
            from: [xMin, contractEntry[1]],
            to: [xMax, contractEntry[1]],
            name: 'Entry price',
            formatter: RiseFallChart.entryPriceFormatter
        };
    }
}
