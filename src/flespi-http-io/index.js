import config from './config'

let _http = undefined,
    _base = ''

/* generate sugar for http
* @param ext {Function} extensible function object
* @param config {Object} settings of sugar
* */
function generate(ext, config) {
    /* setting http function object */
    if (!_http) {
        _http = ext
    }
    let entities = Object.keys(config) /* array of entities by config */

    /* processing all entities in config */
    entities.forEach((entity, index, array) => {
        let localConfig = config[entity], /* config current entity */
            base = ''
        /* if have a base of url - set him into a private variable */
        if (localConfig.base) {
            _base = localConfig.base
        }
        base = _base

        /* check and create namespace */
        if (!ext[entity]) {
            ext[entity] = {}
        }

        /* generate methods for all entities by config current entity */
        if (localConfig.methods && localConfig.methods.length) {
            localConfig.methods.forEach((method, index) => {
                ext[entity][method.name] = function () {
                    let queryString = `${base}${method.pattern}`, /* string of request */
                        options = {} /* options of request */

                    /* build queryString and options */
                    if (method.params && method.params.length) {
                        method.params.forEach((param, index, array) => {
                            /* if param has in pattern - replace into query string */
                            if (queryString.indexOf(param) !== -1) {
                                queryString = queryString.replace(`{${param}}`, arguments[index])
                            }
                            /* if param is query string - setting query to params of options */
                            if (param === 'query' && arguments[index]) {
                                options.params = arguments[index]
                            }
                            /* if param is body - setting body to data of options */
                            if (param === 'body' && arguments[index]) {
                                options.data = arguments[index]
                            }
                            /* last argument take like options */
                            if (index === array.length - 1) {
                                arguments[array.length]
                                    ? options = Object.assign(arguments[array.length], { url: queryString, method: method.name }, options )
                                    : options = Object.assign({ url: queryString, method: method.name }, options )
                            }
                        })
                    }
                    return _http(options)
                }
            })
        }
        /* recursive make methods for children if they have */
        if (localConfig.children) {
            ext[entity] = generate(ext[entity], localConfig.children)
        }
    })
    return ext
}

export default (http) => { return generate(http, config) }