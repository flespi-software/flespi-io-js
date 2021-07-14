import config from './config.json'
import camel from './camelCase'

function generate () {
  let _mqtt,
    _base = ''

  /* generate sugar for mqtt
  * @param ext {Function} extensible function object
  * */
  return function (ext, config) {
    /* setting mqtt function object */
    if (!_mqtt) {
      _mqtt = ext
    }
    const entities = Object.keys(config) /* array of entities by config */

    /* processing all entities in config */
    entities.forEach((entity, index, array) => {
      const localConfig = config[entity] /* config current entity */
      let base = ''
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
            const options = arguments[method.params.length + 1]
            if (options && options.prefix) { topicString = `${options.prefix}/${topicString}` }
            switch (method.name) {
              case 'subscribe': { return _mqtt.subscribe({ name: topicString, handler: arguments[method.params.length], options }) }
              case 'unsubscribe': { return _mqtt.unsubscribe(topicString, arguments[method.params.length], options) }
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
}

export default (mqtt) => {
  return {
    socket: generate()(mqtt, config),
    ...camel(mqtt)
  }
}
