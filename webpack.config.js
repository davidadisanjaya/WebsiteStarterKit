module.exports = {
    entry: [
        './assets/dev/js/app.js'
    ],
    output: {
        path: __dirname + '/assets/js/',
        publicPath: '/assets/js/',
        filename: 'app.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};
