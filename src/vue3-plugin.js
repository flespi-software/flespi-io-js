import Connection from './index'
const connectionInit = (app, config) => {
  /* create of main connector */
  const connector = new Connection(config)
  /* setting main connector to Vue */
  if (config.connectorName) {
    // Vue[config.connectorName] = connector
    app.config.globalProperties[`$${config.connectorName}`] = connector
  } else {
    // Vue.connector = connector
    app.config.globalProperties.$connector = connector
  }
}
/* Main object of plugin */
const ConnectionPlugin = {}
/* install function of plugin */
ConnectionPlugin.install = function (app, config) {
  console.log(app, config)
  if (Array.isArray(config)) {
    config.forEach((con) => { connectionInit(app, con) })
  } else {
    connectionInit(app, config)
  }
}

export default ConnectionPlugin
