import { brand } from '../_utils';

export default data => [{
    name: 'Spot',
    type: 'area',
    data,
    tooltip: {
        valueDecimals: 2,
        zIndex: 120,
    },
    fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [
            [0, brand(0.25)],
            [1, brand(0.1)],
        ],
    },
    lineWidth: 1,
    fillOpacity: 0.1,
    threshold: null,
}];
