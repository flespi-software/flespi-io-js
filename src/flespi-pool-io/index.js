import config from './config'

export default function (http, mqtt) {
    let pool = {}, /* object with methods */
        event_types = ['created', 'updated', 'deleted']/* processed event types */
    /* generate methods function */
    function generate (ext, config) {
        /* process all entities by config */
        Object.keys(config).forEach((name) => {
            /* if need make methods */
            if (config[name].origin) {
                /* make pooling method */
                ext[name] = async function (getHandler, updateHandler) {
                    /* get entities */
                    let entities = await http.get(`${config[name].api}/${config[name].origin.replace(/\+/g, 'all')}`, {})
                    getHandler(entities)/* receive entities to handler */
                    /* make subscription to REST changes in entities and return ids of subscriptions */
                    let ids = []
                    for (let event_type of event_types) {
                        let id = await mqtt.logs.subscribe(config[name].api, config[name].origin, event_type, (message) => { updateHandler(event_type, JSON.parse(message).item_data) })
                        if (id) { ids.push(id) }
                    }
                    return ids
                }
                /* make stop pooling method */
                ext[name].stop = function (ids) {
                    ids.forEach(async (id, index) => {
                        /* unsubscribe from all topics by id */
                        await mqtt.logs.unsubscribe(config[name].api, config[name].origin, event_types[index], id)
                    })
                }
            }
            else { ext[name] = {} }
            /* recurcive process children */
            if (config[name].children) {
                generate(ext[name], config[name].children)
            }
        })
    }
    /* extend pool object */
    generate(pool, config)
    /* return pool object with methods */
    return pool
}