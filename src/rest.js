import HTTP from './http'
import httpExtender from './flespi-http-io/index'
import merge from 'lodash/merge'

/* Class of the connection. It contains of configs and methods of the connection by all protocols. Config contain of settings of current protocol. */
export default class RestConnection {
  constructor (config) {
    const defaultConfig = { server: 'https://flespi.io', token: '' }
    this.http = new HTTP(defaultConfig)/* setting up http to proto */
    config = merge(defaultConfig, config) /* config contains {...settings, token} */
    if (config.token && config.token.indexOf('FlespiToken') === -1) {
      config.token = `FlespiToken ${config.token}`
    }
    /* extending http by sugar */
    const httpSugar = httpExtender(this.http)
    Object.assign(this, httpSugar)
    this.config = config
  }

  get token () { return this.conf.token }
  set token (token) {
    if (typeof token === 'string') {
      this.conf.token = token
    } else { this.conf.token = '' }
    this.http.update('token', token)
  }

  get config () { return this.conf }
  set config (config) {
    this.conf = merge({}, this.conf, config)
    this.http.update('config', this.config)
  }

  /* flespi region */
  setRegion (region) {
    const { rest: restHost } = region
    this.config = Object.assign(this.config, { server: restHost, port: undefined })
  }
}
