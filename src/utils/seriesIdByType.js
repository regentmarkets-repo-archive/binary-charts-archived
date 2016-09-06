import chartTypeToDataType from './chartTypeToDataType';
export default (type) => {
    return `main-${chartTypeToDataType(type)}`;
}
