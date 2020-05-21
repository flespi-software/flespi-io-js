import config from './config.json'

export default function (http, mqtt) {
  const pool = {}, /* object with methods */
    eventTypes = ['created', 'updated', 'deleted']/* processed event types */
    /* generate methods function */
  function generate (ext, config) {
    /* process all entities by config */
    Object.keys(config).forEach((name) => {
      /* if need make methods */
      if (config[name].origin) {
        /* make pooling method */
        ext[name] = async function (getHandler, updateHandler) {
          /* get entities */
          const entities = await http.get(`${config[name].api}/${config[name].origin.replace(/\+/g, 'all')}`, {})
          getHandler(entities)/* receive entities to handler */
          /* make subscription to REST changes in entities and return ids of subscriptions */
          const ids = []
          for (const eventType of eventTypes) {
            try {
              const grants = await mqtt.logs.subscribe(config[name].api, config[name].origin, eventType, (message) => { updateHandler(eventType, JSON.parse(message).item_data) }, { rh: 2 })
              if (grants) { ids.push(Object.keys(grants)[0]) }
            } catch (e) {
              console.log(e.message)
            }
          }
          return ids
        }
        /* make stop pooling method */
        ext[name].stop = function (ids) {
          ids.forEach(async (id, index) => {
            /* unsubscribe from all topics by id */
            await mqtt.logs.unsubscribe(config[name].api, config[name].origin, eventTypes[index], id)
          })
        }
      } else { ext[name] = {} }
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
