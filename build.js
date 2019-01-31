process.env.NODE_ENV = 'production'

var path = require('path');
var webpack = require('webpack');
var axios = require('axios');
var fs = require('fs');

var config = []

/* getting configs from server */
function getConfigs() {
    return Promise.all([
        axios.get('https://flespi.io/platform/api.json').then(resp => resp.data),
        axios.get('https://flespi.io/gw/api.json').then(resp => resp.data),
        axios.get('https://flespi.io/storage/api.json').then(resp => resp.data),
        axios.get('https://flespi.io/mqtt/api.json').then(resp => resp.data),
        axios.get('https://flespi.io/auth/api.json').then(resp => resp.data)
    ])
}

/* generate config by config from flespi */
function generate (config) {
    /* recursive resolve references by config */
    function refResolver (ref) {
        let parts = ref.split('/').slice(1)
        let result = parts.reduce((result, part) => { return result[part] }, config)
        if (result['$ref']) { refResolver(result['$ref']) }
        else { return result }
    }
    /* getting modified parameters by array of parameters from config */
    function getParams (parameters) {
        return parameters
            ? parameters.reduce((result, param) => {
                if (param['$ref']) {
                    let resolved = refResolver(param['$ref'])
                    result.push({ name: resolved.name, in: resolved.in})
                }
                else {
                    result.push({ name: param.name, in: param.in})
                }
                return result
            }, [])
            : []
    }

    var result = { basePath: config.basePath, paths: {} }

    Object.keys(config.paths).forEach((path) => {
        var configByPath = config.paths[path],
            methods = Object.keys(configByPath).filter((method) => method !== 'parameters')

        result.paths[path] = {}
        if (configByPath.parameters) {
            result.paths[path].parameters = getParams(configByPath.parameters)
        }
        methods.forEach((method) => {
            result.paths[path][method] = {}
            if (config.paths[path][method].parameters) {
                result.paths[path][method].parameters = getParams(config.paths[path][method].parameters)
            }
        })
    })

    return result
}

/* generate config method */
function generateConfig(name) {
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
    if (name === 'main') {
        config.output.libraryExport = 'default'
    }
    /* for to make vue plugin rewrite entry */
    if (name === "vue-plugin") {
        config.entry = ['./vue-plugin.js']
    }
    if (name === "module" || name === "vue-plugin" || name === "node") {
        config.externals = {
            axios: 'axios',
            'lodash/merge': 'lodash/merge',
            'lodash/uniqueId': 'lodash/uniqueId',
            'async-mqtt': 'async-mqtt',
            'form-data': 'form-data'
        }
    }
    if (name === 'node') {
        config.target = 'node'
        config.output.libraryExport = 'default'
        config.module.loaders.unshift(
            {
                test: /\.js$/,
                loader: 'shebang-loader'
            }
        )
    }
    return config
}

/* make build by name */
getConfigs()
    .then((configs) => {
        configs = configs.map(config => generate(config))
        fs.writeFileSync(path.resolve(__dirname, "src", "configs.json"), JSON.stringify(configs), 'utf8')
    })
    .then(() => {
    ['main', 'module', 'vue-plugin', 'node'].forEach(function (name) {
        config.push(generateConfig(name))
    })
    webpack(config, (err, stats) => { console.log(stats) })
})