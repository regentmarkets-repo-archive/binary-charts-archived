import React, { Component } from 'react';
import BinaryChart from '../src/BinaryChart';

class TestChart extends Component {

    componentWillMount() {

    }

    render() {
        const fakeTrade = {
            date_start: 1466122500,
            duration: 2,
            amount: 50,
            duration_unit: 'm',
            contract_type: 'CALL',
            basis: 'stake',
        };

        return (
            <BinaryChart trade={fakeTrade} />
        );
    }
}
