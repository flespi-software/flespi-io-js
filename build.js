var path = require('path');
var webpack = require('webpack');
var axios = require('axios');

var config = []

process.env.NODE_ENV = 'production';

/* getting configs from server */
function getConfigs() {
    return Promise.all([
        axios.get('https://flespi.io/platform/api.json').then(resp => resp.data),
        axios.get('https://flespi.io/gw/api.json').then(resp => resp.data),
        axios.get('https://flespi.io/storage/api.json').then(resp => resp.data),
        axios.get('https://flespi.io/registry/api.json').then(resp => resp.data),
        axios.get('https://flespi.io/mqtt/api.json').then(resp => resp.data)
    ])
}

/* generate config method */
function generateConfig(name, configs) {
    var config = {
        context: path.resolve(__dirname, "src"),
        entry: ['./index.js'],
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: name + '.js',
            library: ['flespiIO'],
            libraryTarget: 'umd'
        },
        plugins: [
            new webpack.DefinePlugin({
                'CONFIGS': JSON.stringify(configs)
            }),
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
getConfigs().then((configs) => {
    ['main', 'module', 'vue-plugin'].forEach(function (name) {
        config.push(generateConfig(name, configs))
    })
    webpack(config, (err, stats) => { console.log(stats) })
})