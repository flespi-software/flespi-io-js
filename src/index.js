import HTTP from './http'
import MQTT from './socket'
import httpExtender from './flespi-http-io/index'
import socketExtender from './flespi-mqtt-io/index'
import poolExtender from './flespi-pool-io/index'
import poolCamelCaseExtender from './flespi-pool-io/camelCase'
import merge from 'lodash/merge'

const isBrowser = typeof window !== 'undefined'
/* Class of the connection. It contains of configs and methods of the connection by all protocols. Config contain of settings of current protocol. */
export default class Connection {
  constructor (config) {
    const defaultConfig = { httpConfig: { server: 'https://flespi.io' }, socketConfig: { server: isBrowser ? 'wss://mqtt.flespi.io' : 'mqtt://mqtt.flespi.io:8883' }, token: '' }
    this.config = merge(defaultConfig, config) /* config contains {httpConfig, socketConfig, token} */
    if (this.config.token && this.config.token.indexOf('FlespiToken') === -1) {
      this.config.token = `FlespiToken ${this.config.token}`
    }
    this.socket = new MQTT(merge({}, this.socketConfig, { token: this.config.token }))/* setting up mqtt to proto */
    this.http = new HTTP(merge({}, this.httpConfig, { token: this.config.token }))/* setting up http to proto */
    /* extending http by sugar */
    const httpSugar = httpExtender(this.http)
    Object.assign(this, httpSugar)
    /* extending mqtt by sugar */
    const mqttSugar = socketExtender(this.socket)
    Object.assign(this, mqttSugar)
    this.pool = poolExtender(this.http, this.socket)
    Object.assign(this, poolCamelCaseExtender(this.http, this.socket))
  }

  get token () { return this.config.token }
  set token (token) {
    if (typeof token === 'string') {
      this.config.token = token
    } else { this.config.token = '' }
    this.socket.update('token', this.token)
    this.http.update('token', this.token)
  }

  /* httpConfig: {server, port(optional)}. If it is empty, setting up default prod flespi server for http */
  get httpConfig () { return this.config.httpConfig }
  set httpConfig (config) {
    this.config.httpConfig = config
    this.http.update('config', config)
  }

  /* socketConfig: {server, port(optional)}. If it is empty, setting up default prod flespi server for mqtt */
  get socketConfig () { return this.config.socketConfig }
  set socketConfig (config) {
    this.config.socketConfig = config
    this.socket.update('config', config)
  }

  /* flespi region */
  setRegion (region) {
    let { 'mqtt-ws': mqttHost, rest: restHost } = region
    mqttHost = `wss://${mqttHost}`
    this.socketConfig = Object.assign(this.socketConfig, { server: mqttHost, port: undefined })
    this.httpConfig = Object.assign(this.httpConfig, { server: restHost, port: undefined })
  }
}
