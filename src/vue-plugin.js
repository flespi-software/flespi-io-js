import Connection from './index'
/* Main object of plugin */
let ConnectionPlugin = {}
/* install function of plugin */
ConnectionPlugin.install = function (Vue, config) {
    /* create of main connector */
    let connector = new Connection(config)
    /* setting main connector to Vue */
    Vue.connector = connector
    Vue.prototype.$connector = connector
}

export default ConnectionPlugin