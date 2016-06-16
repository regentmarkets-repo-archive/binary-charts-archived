export default ({ data, pipSize, type }) => [{
    name: 'Spot',
    type,
    data,
    tooltip: {
        valueDecimals: pipSize,
        zIndex: 120,
    },
    fillOpacity: 0.1,
    threshold: null,
    zoneAxis: 'x',
}];
