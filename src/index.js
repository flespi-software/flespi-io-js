import http from './http'
import mqtt from './mqtt'
import httpExtender from './flespi-http-io/camelCase'
import mqttExtender from './flespi-mqtt-io/camelCase'
import poolExtender from './flespi-pool-io/index'
import poolCamelCaseExtender from './flespi-pool-io/camelCase'
import merge from 'lodash/merge'

/* Class of the connection. It contains of configs and methods of the connection by all protocols. Config contain of settings of current protocol. */
class Connection {
    constructor (config) {
        let defaultConfig = {httpConfig: { server: 'https://flespi.io' }, mqttConfig: { server: 'wss://mqtt.flespi.io' }, token: ''}
        this.config = merge(defaultConfig, config) /* config contains {httpConfig, mqttConfig, token} */
        this.mqtt = mqtt/* setting up mqtt to proto */
        this.http = http/* setting up http to proto */
        this.http.init(this.token, this.httpConfig)/* init HTTP */
        this.mqtt.init(this.token, this.mqttConfig)/* init MQTT */
        /* extending http by sugar */
        Object.assign(this, httpExtender(this.http))
        /* extending mqtt by sugar */
        Object.assign(this, mqttExtender(this.mqtt))
        this.pool = poolExtender(this.http, this.mqtt)
        Object.assign(this, poolCamelCaseExtender(this.http, this.mqtt))
    }
    get token () { return this.config.token }
    set token (token) {
        this.config.token = token
        this.mqtt.update('token', this.token)
        this.http.update('token', this.token)
    }

    /* httpConfig: {server, port(optional)}. If it is empty, setting up default prod flespi server for http */
    get httpConfig () { return this.config.httpConfig }
    set httpConfig (config) {
        this.config.httpConfig = config
        this.http.update('config', config)
    }
    /* mqttConfig: {server, port(optional)}. If it is empty, setting up default prod flespi server for mqtt */
    get mqttConfig () { return this.config.mqttConfig }
    set mqttConfig (config) {
        this.config.mqttConfig = config
        this.mqtt.update('config', config)
    }
}

export default Connection