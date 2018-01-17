import config from './config'

let _http = undefined,
    _base = '',
    _partNameOFMethod = ''

/* generate sugar for http
* @param http {Function} extensible http object
* */
function generate(http, config) {
    /* setting http function object */
    if (!_http) {
        _http = http
    }
    let entities = Object.keys(config), /* array of entities by config */
        result = {}

    /* processing all entities in config */
    entities.forEach((entity, index, array) => {
        let localConfig = config[entity], /* config current entity */
            base = ''
        /* if have a base of url - set him into a private variable */
        if (localConfig.base) {
            _base = localConfig.base
        }
        base = _base

        /* generate methods for all entities by config current entity */
        if (localConfig.methods && localConfig.methods.length) {
            localConfig.methods.forEach((method, index) => {
                result[`${method.name}${_partNameOFMethod}${entity[0].toUpperCase()+entity.slice(1)}`] = function () {
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
            let currentPartNameOfMethod = entity[0].toUpperCase()+entity.slice(1) /* current entity with first symbol in upper case */
            _partNameOFMethod = `${_partNameOFMethod}${currentPartNameOfMethod}`
            Object.assign(result, generate(http, localConfig.children))
            _partNameOFMethod = _partNameOFMethod.replace(currentPartNameOfMethod, '')/* restore part name */
        }
    })

    return result
}

export default (http) => { return generate(http, config) }