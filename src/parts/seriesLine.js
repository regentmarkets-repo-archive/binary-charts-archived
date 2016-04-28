import brandColor from 'binary-utils/lib/brandColor';

export default ({ data, pipSize }) => [{
    name: 'Spot',
    type: 'area',
    data,
    tooltip: {
        valueDecimals: pipSize,
        zIndex: 120,
    },
    fillColor: brandColor(0.1),
    lineWidth: 1.5,
    fillOpacity: 0.1,
    threshold: null,
    zoneAxis: 'x',
}];
