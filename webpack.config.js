var path = require('path');

module.exports = {
    devtool: 'source-map',

    entry: path.join(__dirname, 'src/test.js'),

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, ],
    },

    output: {
        library: 'binary-live-api',
        libraryTarget: 'umd',
        path: 'lib',
        filename: 'binary-live-api.js',
    },

    output: {
        path: path.join(__dirname, 'example/'),
        filename: 'bundle.js',
    },
};
