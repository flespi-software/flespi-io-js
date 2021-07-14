import MQTT from './socket'
import socketExtender from './flespi-mqtt-io/index'
import merge from 'lodash/merge'

const isBrowser = typeof window !== 'undefined'
/* Class of the connection. It contains of configs and methods of the connection by all protocols. Config contain of settings of current protocol. */
export default class MqttConnection extends MQTT {
  constructor (config) {
    super(config)
    const defaultConfig = { server: isBrowser ? 'wss://mqtt.flespi.io' : 'mqtt://mqtt.flespi.io:8883', token: '' }
    this._config = merge(defaultConfig, config) /* config contains {...settings, token} */
    if (this._config.token && this._config.token.indexOf('FlespiToken') === -1) {
      this._config.token = `FlespiToken ${this._config.token}`
    }
    /* extending mqtt by sugar */
    const mqttSugar = socketExtender(this)
    Object.assign(this, mqttSugar)
  }

  get token () { return this._config.token }
  set token (token) {
    if (typeof token === 'string') {
      this._config.token = token
    } else { this._config.token = '' }
    this.update('token', this.token)
  }

  /* socketConfig: {server, port(optional)}. If it is empty, setting up default prod flespi server for mqtt */
  get config () { return this._config }
  set config (config) {
    this.update('config', config)
  }

  /* flespi region */
  setRegion (region) {
    let { 'mqtt-ws': mqttHost } = region
    mqttHost = `wss://${mqttHost}`
    this.settings = Object.assign(this.config, { server: mqttHost, port: undefined })
  }
}
