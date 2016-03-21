var path = require('path');

module.exports = {
    entry: './src/index.js',

    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ],
    },

    output: {
        library: 'binary-charts',
        libraryTarget: 'umd',
        filename: 'binary-charts.js',
        path: './lib'
    },

    externals: {
        react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
        },
        "react-dom": {
            root: 'ReactDOM',
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
        }
    },
};
