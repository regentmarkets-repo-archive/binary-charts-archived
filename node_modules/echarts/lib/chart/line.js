

    var zrUtil = require('zrender/lib/core/util');
    var echarts = require('../echarts');

    require('./line/LineSeries');
    require('./line/LineView');

    echarts.registerVisualCoding('chart', zrUtil.curry(
        require('../visual/symbol'), 'line', 'circle', 'line'
    ));
    echarts.registerLayout(zrUtil.curry(
        require('../layout/points'), 'line'
    ));
