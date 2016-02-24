/**
 * DataZoom component entry
 */


    require('../echarts').registerPreprocessor(
        require('./visualMap/preprocessor')
    );

    require('./visualMap/typeDefaulter');
    require('./visualMap/visualCoding');
    require('./visualMap/ContinuousModel');
    require('./visualMap/ContinuousView');
    require('./visualMap/visualMapAction');

