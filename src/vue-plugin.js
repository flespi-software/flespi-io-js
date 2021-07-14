import Connection from './index'
const connectionInit = (Vue, config) => {
  /* create of main connector */
  const connector = new Connection(config)
  /* setting main connector to Vue */
  if (config.connectorName) {
    Vue[config.connectorName] = connector
    Vue.prototype[`$${config.connectorName}`] = connector
  } else {
    Vue.connector = connector
    Vue.prototype.$connector = connector
  }
}
/* Main object of plugin */
const ConnectionPlugin = {}
/* install function of plugin */
ConnectionPlugin.install = function (Vue, config) {
  if (Array.isArray(config)) {
    config.forEach((con) => { connectionInit(Vue, con) })
  } else {
    connectionInit(Vue, config)
  }
}

export default ConnectionPlugin
