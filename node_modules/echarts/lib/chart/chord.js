

    require('./chord/ChordSeries');
    require('./chord/ChordView');

    var echarts = require('../echarts');
    var zrUtil = require('zrender/lib/core/util');
    echarts.registerLayout(require('./chord/chordCircularLayout'));

    echarts.registerVisualCoding(
        'chart',  zrUtil.curry(require('../visual/dataColor'), 'chord')
    );

    echarts.registerProcessor(
        'filter', zrUtil.curry(require('../processor/dataFilter'), 'pie')
    );
