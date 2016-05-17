import brandColor from 'binary-utils/lib/brandColor';

export default ({ data, pipSize, type }) => [{
    name: 'Spot',
    type: (type === 'candles') ? 'candlestick' : 'area',
    data,
    tooltip: {
        valueDecimals: pipSize,
        zIndex: 120,
    },
    fillColor: brandColor(0.1),
    fillOpacity: 0.1,
    threshold: null,
    zoneAxis: 'x',
}];
