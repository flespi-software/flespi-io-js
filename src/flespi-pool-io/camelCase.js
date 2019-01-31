import config from './config.json'

let _api = '',
    _partNameOFMethod = '',
    event_types = ['created', 'updated', 'deleted']/* processed event types */

/* generate sugar for mqtt
* @param http {Function} http root object
* @param mqtt {Function} mqtt root object
* @param config {Object} settings of sugar
* */
function generate(http, mqtt, config) {
    let entities = Object.keys(config), /* array of entities by config */
        result = {}

    /* processing all entities in config */
    entities.forEach((entity, index, array) => {
        let localConfig = config[entity], /* config current entity */
            api = ''
        /* if have a base of url - set him into a private variable */
        if (localConfig.api) {
            _api = localConfig.api
        }
        api = _api

        /* if need generate methods */
        if (localConfig.origin) {
            /* generate methods for all entities by config current entity */
            result[`pool${_partNameOFMethod}${entity[0].toUpperCase()+entity.slice(1)}`] = async function (getHandler, updateHandler) {
                /* get entities */
                let entities = await http.get(`${localConfig.api}/${localConfig.origin.replace(/\+/g, 'all')}`, {})
                getHandler(entities)/* receive entities to handler */
                /* make subscription to REST changes in entities and return ids of subscriptions */
                let ids = []
                for (let event_type of event_types) {
                    try {
                        let grants = await mqtt.logs.subscribe(localConfig.api, localConfig.origin, event_type, (message) => { updateHandler(event_type, JSON.parse(message).item_data) }, { rh: 0 })
                        if (grants) { ids.push(Object.keys(grants)[0]) }
                    } catch (e) {
                        console.log(e)
                    }
                }
                return ids
            }
            /* make stop pooling method */
            result[`pool${_partNameOFMethod}${entity[0].toUpperCase()+entity.slice(1)}Stop`] = function (ids) {
                ids.forEach(async (id, index) => {
                    /* unsubscribe from all topics by id */
                    await mqtt.logs.unsubscribe(localConfig.api, localConfig.origin, event_types[index], id)
                })
            }
        }
        /* recurcive process children */
        if (localConfig.children) {
            let currentPartNameOfMethod = entity[0].toUpperCase()+entity.slice(1) /* current entity with first symbol in upper case */
            _partNameOFMethod = `${_partNameOFMethod}${currentPartNameOfMethod}`
            Object.assign(result, generate(http, mqtt, localConfig.children))
            _partNameOFMethod = _partNameOFMethod.replace(currentPartNameOfMethod, '')/* restore part name */
        }
    })
    return result
}

export default (http, mqtt) => { return generate(http, mqtt, config) }