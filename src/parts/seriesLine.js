import brandColor from 'binary-utils/lib/brandColor';

export default ({ data, pipSize }) => [{
    name: 'Spot',
    type: 'area',
    data,
    tooltip: {
        valueDecimals: pipSize,
        zIndex: 120,
    },
    fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [
            [0, brandColor(0.25)],
            [1, brandColor(0.1)],
        ],
    },
    lineWidth: 1,
    fillOpacity: 0.1,
    threshold: null,
}];
