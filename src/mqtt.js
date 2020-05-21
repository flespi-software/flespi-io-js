import socket from './socket'
import socketExtender from './flespi-mqtt-io/camelCase'
import merge from 'lodash/merge'

const isBrowser = typeof window !== 'undefined'
/* Class of the connection. It contains of configs and methods of the connection by all protocols. Config contain of settings of current protocol. */
export default class MqttConnection {
  constructor (config) {
    const defaultConfig = { settings: { server: isBrowser ? 'wss://mqtt.flespi.io' : 'mqtt://mqtt.flespi.io:8883' }, token: '' }
    this.config = merge(defaultConfig, config) /* config contains {settings, token} */
    if (this.config.token && this.config.token.indexOf('FlespiToken') === -1) {
      this.config.token = `FlespiToken ${this.config.token}`
    }
    const mqtt = Object.assign(socket, socketExtender(socket))
    // this.socket = socket/* setting up mqtt to proto */
    // this.socket.init(this.token, this.config)/* init MQTT */
    /* extending mqtt by sugar */
    Object.assign(this, mqtt)
    this.init(this.token, this.settings)
  }

  get token () { return this.config.token }
  set token (token) {
    if (typeof token === 'string') {
      this.config.token = token
    } else { this.config.token = '' }
    this.update('token', this.token)
  }

  /* socketConfig: {server, port(optional)}. If it is empty, setting up default prod flespi server for mqtt */
  get settings () { return this.config.settings }
  set settings (settings) {
    this.config.settings = settings
    this.update('config', settings)
  }

  /* flespi region */
  setRegion (region) {
    let { 'mqtt-ws': mqttHost } = region
    mqttHost = `wss://${mqttHost}`
    this.settings = Object.assign(this.config.settings, { server: mqttHost, port: undefined })
  }
}
