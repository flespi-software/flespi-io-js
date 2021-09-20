import config from './config.json'

function generate () {
  let _mqtt,
    _base = '',
    _partNameOFMethod = ''

  /* generate sugar for mqtt
  * @param mqtt {Function} extensible function object
  * @param config {Object} settings of sugar
  * */
  function generate (mqtt, config) {
    /* setting mqtt function object */
    if (!_mqtt) {
      _mqtt = mqtt
    }
    const entities = Object.keys(config), /* array of entities by config */
      result = {}
    /* processing all entities in config */
    entities.forEach((entity, index, array) => {
      const localConfig = config[entity] /* config current entity */
      let base = ''
      /* if have a base of url - set him into a private variable */
      if (localConfig.base) {
        _base = localConfig.base
      }
      base = _base

      /* generate methods for all entities by config current entity */
      if (localConfig.methods && localConfig.methods.length) {
        localConfig.methods.forEach((method, index) => {
          result[`${method.name}${_partNameOFMethod}${entity[0].toUpperCase() + entity.slice(1)}`] = function () {
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
      /* recursive create methods for children if they have */
      if (localConfig.children) {
        const currentPartNameOfMethod = entity[0].toUpperCase() + entity.slice(1) /* current entity with first symbol in upper case */
        _partNameOFMethod = `${_partNameOFMethod}${currentPartNameOfMethod}`
        Object.assign(result, generate(mqtt, localConfig.children))
        _partNameOFMethod = _partNameOFMethod.replace(currentPartNameOfMethod, '')/* restore part name */
      }
    })
    return result
  }
  return generate
}

export default (mqtt) => { return generate()(mqtt, config) }
