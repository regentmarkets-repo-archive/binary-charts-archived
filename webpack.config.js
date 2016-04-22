module.exports = {
    entry: './src/index.js',

    devtool: 'source-map',

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
        libraryTarget: "var",
        library: "BinaryChart",
        path: './example/',
        filename: 'bundle.js',
    },
};
