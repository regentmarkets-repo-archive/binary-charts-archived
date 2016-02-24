/**
 * @file Data zoom model
 */


    var DataZoomModel = require('./DataZoomModel');

    module.exports = DataZoomModel.extend({

        type: 'dataZoom.inside',

        /**
         * @protected
         */
        defaultOption: {
            zoomLock: false // Whether disable zoom but only pan.
        }

    });

