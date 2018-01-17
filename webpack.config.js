var path = require('path');
var webpack = require('webpack');

var config = []

/* generate config method */
function generateConfig(name) {
    var config = {
        context: path.resolve(__dirname, "src"),
        entry: ['./index.js'],
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: name + '.js',
            library: ['flespi-io'],
            libraryTarget: 'umd'
        },
        devtool: "source-map",
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        }
    }
    /* for to make vue plugin rewrite entry */
    if (name === "vue-plugin") {
        config.entry = ['./vue-plugin.js']
    }
    if (name === "module" || name === "vue-plugin") {
        config.externals = {
            axios: 'axios',
            'lodash/merge': 'lodash/merge',
            'lodash/uniqueId': 'lodash/uniqueId',
            mqtt: 'mqtt'
        }
    }
    return config
}

/* make build by name */
['main', 'module', 'vue-plugin'].forEach(function (name) {
    config.push(generateConfig(name))
})

module.exports = config