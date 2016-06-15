import brandColor from 'binary-utils/lib/brandColor';

export default ({ data, pipSize, type }) => [{
    name: 'Spot',
    type,
    data,
    tooltip: {
        valueDecimals: pipSize,
        zIndex: 120,
    },
    // fillColor: brandColor(0.1),
    fillOpacity: 0.1,
    threshold: null,
    zoneAxis: 'x',
}];
