import chartTypeToDataType from './chartTypeToDataType';

export default (chart, type) => {
    const dataType = chartTypeToDataType(type);
    return chart.get(`main-${dataType}`);
}
