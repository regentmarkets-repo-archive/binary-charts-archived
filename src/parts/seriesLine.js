import { brand } from '../theme';

export default data => [{
    name: 'Spot',
    type: 'area',
    data,
    tooltip: {
        valueDecimals: 2
    },
    fillColor : {
              linearGradient : [0, 0, 0, 300],
              stops : [
                [0, brand(.25)],
                [1, brand(.1)]
              ]
            },
    lineWidth: 1,
    fillOpacity: .1,
    threshold: null,
}];
