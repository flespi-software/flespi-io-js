import Connection from './index'
/* Main object of plugin */
const ConnectionPlugin = {}
/* install function of plugin */
ConnectionPlugin.install = function (Vue, config) {
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

export default ConnectionPlugin
