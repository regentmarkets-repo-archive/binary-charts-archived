

    var simpleLayoutHelper = require('./simpleLayoutHelper');
    module.exports = function (ecModel, api) {
        ecModel.eachSeriesByType('graph', function (seriesModel) {
            var layout = seriesModel.get('layout');
            if (!layout || layout === 'none') {
                simpleLayoutHelper(seriesModel);
            }
        });
    };
