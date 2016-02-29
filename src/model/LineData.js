export const createDataLabel = (color = 'rgb(102, 0, 204)', position = 'top', size = '15') => ({
    normal: {
        show: true,
        position,
        textStyle: {
            color,
            fontSize: size,
        }
    }
});

/**
 * @param dataArr - 2D array !!
 */
export const createLineData = (dataArr) => {
    const namedData = dataArr.map(v => ({name: v[0].toString() + v[1].toString(), value: v}));
    return namedData;
};

// not associate with keys as this is part of an array
// check http://echarts.baidu.com/option.html#series-line.markLine.data
export const createMarklineDataElement = (
    from,
    to,
    name,
    labelFormatter = '{b}: {c}',
    color = 'rgb(0, 128, 255)',
    width = '1',
    type = 'dotted') => ([
    {
        name,
        coord: from,
        lineStyle: {
            normal: {
                color,
                width,
                type
            },
        },
        label: {
            normal: {
                formatter: labelFormatter
            }
        }
    },
    {
        coord: to,
    }
]);

// not associate with keys as this is part of an array
// check http://echarts.baidu.com/option.html#series-line.markPoint.data
export const createMarkPointDataElement = (
    at,
    name,
    symbol = 'arrow',
    color = 'rgb(0, 255, 0)',
    fontSize = '12') => ({

    name,
    coord: at,
    symbol,
    itemStyle: {
        normal: {
            color,
        }
    },
    label: {
        normal: {
            textStyle: {
                fontSize
            }
        }
    }
});

/**
 * Create a line on chart with optional markline(s) and optional markpoint(s)
 * @param name      - name of series, eg 'R100'
 * @param color     - color of main line
 * @param width     - width of main line
 * @param data
 * @param barriers  - [{from, to, name, formatter}, ...]
 * @param points    - [{at, name, formatter}, ...]
 */
export const createSeriesAsLine = (name, data, barriers, points, color = 'rgb(0, 153, 0)', width = '2') => {
    "use strict";
    const dataLine = createLineData(data);
    const type = 'line';
    const markLine = barriers && {
        symbol: 'none',
        data: barriers.map(b => createMarklineDataElement(b.from, b.to, b.name, b.formatter))
    };
    const markPoint = points && {
        label: {
            normal: {
                formatter: points[0].formatter
            }
        },
        data: points.map(p => createMarkPointDataElement(p.at, p.name))
    };

    return {
        symbol:'none',
        name,
        lineStyle: {
            normal: {
                color,
                width
            }
        },
        clipOverflow: false,
        type,
        data: dataLine,
        markLine,
        markPoint,
    };
};

export const decorateSeriesWithAreaStyle = (series, areaStyle = {normal: {color: 'rgb(204, 255, 204)'}}) =>
    Object.assign(series, {areaStyle});
