import http from './http'
import httpExtender from './flespi-http-io/index'
import merge from 'lodash/merge'

/* Class of the connection. It contains of configs and methods of the connection by all protocols. Config contain of settings of current protocol. */
export default class RestConnection {
  constructor (config) {
    const defaultConfig = { settings: { server: 'https://flespi.io' }, token: '' }
    this.config = merge(defaultConfig, config) /* config contains {settings, token} */
    if (this.config.token && this.config.token.indexOf('FlespiToken') === -1) {
      this.config.token = `FlespiToken ${this.config.token}`
    }
    this.request = http/* setting up http to proto */
    this.request.init(this.token, this.settings)/* init HTTP */
    /* extending http by sugar */
    const httpSugar = httpExtender(this.request)
    Object.assign(this, httpSugar)
  }

  get token () { return this.config.token }
  set token (token) {
    if (typeof token === 'string') {
      this.config.token = token
    } else { this.config.token = '' }
    this.request.update('token', this.token)
  }

  /* httpConfig: {server, port(optional)}. If it is empty, setting up default prod flespi server for http */
  get settings () { return this.config.settings }
  set settings (settings) {
    this.config.settings = settings
    this.request.update('config', settings)
  }

  /* flespi region */
  setRegion (region) {
    const { rest: restHost } = region
    this.settings = Object.assign(this.config.settings, { server: restHost, port: undefined })
  }
}
