import axios from 'axios'
import merge from 'lodash/merge'

/* Simple helper by getting up of baseURL parameter */
const getBaseURl = (config) => {
  let baseURL = ''
  if (config.server) {
    baseURL = config.server
  }
  if (config.port) {
    baseURL += `:${config.port}`
  }
  return baseURL
}
class HTTP {
  /* Main function of http connection. It setting up private variables, global headers and return promise of the request */
  constructor (options) {
    /* config of http connection {server, port(optional), token} */
    this.config = merge(
      {},
      {
        baseURL: getBaseURl(options),
        headers: { Authorization: options.token }
      },
      options
    )
  }
  /* Updating function of the http connection. Thats update private params of the connection and rebuild client */
  update (type, payload) {
    switch (type) {
      case 'token': {
        this.config.token = payload
        this.config.headers.Authorization = payload
        break
      }
      case 'config': {
        if (this.config.token !== payload.token) {
          this.config.headers.Authorization = payload.token
        }
        this.config = merge({}, this.config, payload)
        break
      }
    }
  }
  request (options) {
    return axios(merge({}, this.config, options))
  }
  get (url, options) {
    return axios(merge({}, this.config, options, { url: url, method: 'get' }))
  }
  delete (url, options) {
    return axios(merge({}, this.config, options, { url: url, method: 'delete' }))
  }
  post (url, data, options) {
    return axios(merge({}, this.config, options, { url: url, method: 'post', data: data }))
  }
  put (url, data, options) {
    return axios(merge({}, this.config, options, { url: url, method: 'put', data: data }))
  }
  /* availability make request to another resourses */
  external () { return axios(...arguments) }
}

// export default extender(http)
export default HTTP
