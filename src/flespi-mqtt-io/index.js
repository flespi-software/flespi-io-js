import config from './config.json'

let _mqtt = undefined,
    _base = ''

/* generate sugar for mqtt
* @param ext {Function} extensible function object
* */
function generate(ext, config) {
    /* setting mqtt function object */
    if (!_mqtt) {
        _mqtt = ext
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
                    let topicString = `${base}${method.pattern}` /* topic name */

                    /* build topic */
                    if (method.params && method.params.length) {
                        method.params.forEach((param, index, array) => {
                            /* if param has in pattern - replace into topic */
                            if (topicString.indexOf(param) !== -1) {
                                topicString = topicString.replace(`{${param}}`, arguments[index])
                            }
                        })
                    }
                    if (!_mqtt.hasClient()) { _mqtt([]) } /* if client is empty - try to create new client */
                    switch (method.name) {
                        case 'subscribe': { return _mqtt.subscribe({name: topicString, handler: arguments[method.params.length], options: arguments[method.params.length + 1]}) }
                        case 'unsubscribe': { return _mqtt.unsubscribe(topicString, arguments[method.params.length], arguments[method.params.length + 1]) }
                    }
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

export default (mqtt) => { return generate(mqtt, config) }