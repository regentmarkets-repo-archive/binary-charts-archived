module.exports = {
    devtool: 'source-map',

    entry: 'src/test.js',

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.js$/,
            loader: 'eslint-loader',
            include: 'src',
        }],
    },

    output: {
        path: 'example/',
        filename: 'bundle.js',
    },
};
