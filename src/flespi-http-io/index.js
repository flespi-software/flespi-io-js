//import dotCaseGenerator from './dotCase'
//import camelCaseGenerator from './camelCase'

/* getting configs from server */
function getConfigs() {
    return Promise.all([
        fetch('https://flespi.io/platform/api.json').then(resp => resp.json()),
        fetch('https://flespi.io/gw/api.json').then(resp => resp.json()),
        fetch('https://flespi.io/storage/api.json').then(resp => resp.json()),
        fetch('https://flespi.io/registry/api.json').then(resp => resp.json()),
        fetch('https://flespi.io/mqtt/api.json').then(resp => resp.json())
    ])
}

/* sugar generator */
function generate (http, config) {
    let base = config.basePath,
        baseName = base.slice(1)
    /* make namespace for current API */
    http[baseName] = {}

    function refResolver (ref) {
        let parts = ref.split('/').slice(1)
        let result = parts.reduce((result, part) => { return result[part] }, config)
        if (result['$ref']) { refResolver(result['$ref']) }
        else { return result }
    }

    /* make object with all methods by current config */
    return Object.keys(config.paths).reduce((result, path, index) => {
        let methods = Object.keys(config.paths[path]).filter((method) => method !== 'parameters'),/* all methods by path w/o parameters */
            /* all parameters by path with resolve refs */
            parameters =  config.paths[path].parameters
                ? config.paths[path].parameters.reduce((result, param) => {
                    if (param['$ref']) {
                        let resolved = refResolver(param['$ref'])
                        result[resolved.name] = resolved.in
                    }
                    else {
                        result[param.name] = param.in
                    }
                    return result
                }, {})
                : {}
        /* get params and parts of path from path */
        let parsedPath = path.split('/').reduce((result, part) => {
            if (part.match(/{(.*)}/g)) {
                result.params.push(part)
            }
            else if (part) {
                /* rebase part of path to camel case */
                result.parts.push(part.replace(/-\w/g, (match) => { return match[1].toUpperCase() }))
            }
            return result
        }, { params: [], parts: [] })
        methods.forEach((method) => {
            /* all parameters by method with resolve refs */
            let paramsByMethod = config.paths[path][method].parameters
                ? config.paths[path][method].parameters.reduce((result, param) => {
                    if (param['$ref']) {
                        let resolved = refResolver(param['$ref'])
                        result[resolved.name] = resolved.in
                    }
                    else {
                        result[param.name] = param.in
                    }
                    return result
                }, {})
                : {}
            /* make empty field for method */
            parsedPath.parts.reduce((obj, name) => {
                if (!obj[name]) { obj[name] = {} }
                return obj[name]
            }, http[baseName])
            /* make dot case methods by extend http object */
            parsedPath.parts.reduce((obj, name, index, array) => {
                if (index === array.length - 1) {
                    obj[name][method] = function () {
                        let queryString = `${base}${path}`,
                            options = {},
                            localParams = [...parsedPath.params]

                        if (Object.values(paramsByMethod).includes('query')) { localParams.push('query') }
                        if (Object.values(paramsByMethod).includes('body')) { localParams.push('body') }

                        /* path params to url request */
                        localParams.forEach((param, index) => {
                            if (queryString.indexOf(param) !== -1) {
                                queryString = queryString.replace(param, arguments[index])
                            }
                            /* if param is query string - setting query to params of options */
                            if (param === 'query' && arguments[index]) {
                                options.params = arguments[index]
                            }
                            /* if param is body - setting body to data of options */
                            if (param === 'body' && arguments[index]) {
                                options.data = arguments[index]
                            }
                        })
                        /* last argument take like options */
                        arguments[localParams.length]
                            ? options = Object.assign(arguments[localParams.length], { url: queryString, method: method }, options )
                            : options = Object.assign({ url: queryString, method: method }, options )

                        return http(options)
                    }
                }
                return obj[name]
            }, http[baseName])
            /* make camel case methods */
            let nameOfMethod = parsedPath.parts.reduce((result, part) => {
                return result += part[0].toUpperCase()+part.slice(1).replace(/-\w/g, (match) => { return match[1].toUpperCase() })
            }, `${method}`)
            result[nameOfMethod] = function () {
                let queryString = `${base}${path}`,
                    options = {},
                    localParams = [...parsedPath.params]

                if (Object.values(paramsByMethod).includes('query')) { localParams.push('query') }
                if (Object.values(paramsByMethod).includes('body')) { localParams.push('body') }

                /* path params to url request */
                localParams.forEach((param, index) => {
                    if (queryString.indexOf(param) !== -1) {
                        queryString = queryString.replace(param, arguments[index])
                    }
                    /* if param is query string - setting query to params of options */
                    if (param === 'query' && arguments[index]) {
                        options.params = arguments[index]
                    }
                    /* if param is body - setting body to data of options */
                    if (param === 'body' && arguments[index]) {
                        options.data = arguments[index]
                    }
                })
                /* last argument take like options */
                arguments[localParams.length]
                    ? options = Object.assign(arguments[localParams.length], { url: queryString, method: method }, options )
                    : options = Object.assign({ url: queryString, method: method }, options )

                return http(options)
            }
        })
        return result
    }, {})
}

export default async (http) => {
    let configs = await getConfigs()
    return configs.reduce((result, config) => {
        result[config.basePath.slice(1)] = generate(http, config)
        return result
    }, {})
}