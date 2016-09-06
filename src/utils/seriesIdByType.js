import chartTypeToDataType from './chartTypeToDataType';

export default (type) => `main-${chartTypeToDataType(type)}`;
