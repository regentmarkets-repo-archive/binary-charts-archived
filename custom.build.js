const webpack = require('webpack');

const env = process.env.NODE_ENV;

module.exports = {
    entry: './src/PlainChart.js',
    output: {
        library: 'binary-charts-plain',
        libraryTarget: 'umd',
        filename: 'binary-charts-plain.js',
        path: './lib',
    },
    devtool: env === 'production' ? 'source-map' : 'eval',
    module: {
        loaders: [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'eslint' },
        ],
    },
    plugins: env === 'production' ? [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
    ] : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
};

