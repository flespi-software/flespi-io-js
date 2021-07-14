/* sugar generator */
import CONFIGS from '../configs.json'
const FData = typeof FormData !== 'undefined' ? FormData : require('form-data')
// const CONFIGS = require('../configs.json')
function generate (http, config) {
  const base = config.basePath,
    baseName = base.slice(1)
    /* make namespace for current API */
  http[baseName] = {}

  function refResolver (ref) {
    const parts = ref.split('/').slice(1)
    const result = parts.reduce((result, part) => { return result[part] }, config)
    if (result.$ref) { refResolver(result.$ref) } else { return result }
  }

  /* make object with all methods by current config */
  return Object.keys(config.paths).reduce((result, path, index) => {
    const methods = Object.keys(config.paths[path]).filter((method) => method !== 'parameters') /* all methods by path w/o parameters */
    /* get params and parts of path from path */
    const parsedPath = path.split('/').reduce((result, part) => {
      if (part.match(/{([\w.-]+)}/g)) {
        result.params.push(part)
      } else if (part) {
        /* rebase part of path to camel case */
        result.parts.push(part.replace(/[.-]\w/g, (match) => { return match[1].toUpperCase() }))
      }
      return result
    }, { params: [], parts: [] })
    methods.forEach((method) => {
      /* all parameters by method with resolve refs */
      const paramsByMethod = config.paths[path][method].parameters
        ? config.paths[path][method].parameters.reduce((result, param) => {
          if (param.$ref) {
            const resolved = refResolver(param.$ref)
            result[resolved.name] = resolved.in
          } else {
            result[param.name] = param.in
          }
          return result
        }, {})
        : {}
      /* make empty field for method */
      parsedPath.parts.reduce((obj, name) => {
        if (!obj[name]) { obj[name] = {} }
        return obj[name]
      }, http[baseName])
      /* make dot case methods by extend http object */
      parsedPath.parts.reduce((obj, name, index, array) => {
        if (index === array.length - 1) {
          obj[name][method] = function () {
            let queryString = `${base}${path}`,
              options = {}
            const localParams = [...parsedPath.params]

            if (Object.values(paramsByMethod).includes('query')) { localParams.push('query') }
            if (Object.values(paramsByMethod).includes('body')) { localParams.push('body') }
            /* process params with multipart data */
            if (Object.values(paramsByMethod).includes('formData')) {
              const formDataParams = Object.keys(paramsByMethod).filter((name) => paramsByMethod[name] === 'formData')
              formDataParams.forEach((name) => {
                localParams.push(`formData_${name}`)
              })
            }

            /* path params to url request */
            localParams.forEach((param, index) => {
              if (queryString.indexOf(param) !== -1) {
                queryString = queryString.replace(param, arguments[index])
              }
              /* if param is query string - setting query to params of options */
              if (param === 'query' && arguments[index]) {
                options.params = arguments[index]
              }
              /* if param is body - setting body to data of options */
              if (param === 'body' && arguments[index]) {
                options.data = arguments[index]
              }
              /* if param is body - setting body to data of options */
              if (param.indexOf('formData_') === 0 && arguments[index]) {
                if (!options.data) {
                  options.data = new FData()
                }
                const name = param.split('_')[1]
                options.data.append(name, arguments[index])
                if (name === 'file') {
                  if (!options.headers) { options.headers = {} }
                  options.headers['Content-Type'] = `multipart/form-data; boundary=${options.data._boundary}`
                }
              }
            })
            /* last argument take like options */
            arguments[localParams.length]
              ? options = Object.assign(arguments[localParams.length], { url: queryString, method: method }, options)
              : options = Object.assign({ url: queryString, method: method }, options)

            return http.request(options)
          }
        }
        return obj[name]
      }, http[baseName])
      /* make camel case methods */
      const nameOfMethod = parsedPath.parts.reduce((result, part) => {
        result += part[0].toUpperCase() + part.slice(1).replace(/-\w/g, (match) => { return match[1].toUpperCase() })
        return result
      }, `${method}`)
      result[nameOfMethod] = function () {
        let queryString = `${base}${path}`,
          options = {}
        const localParams = [...parsedPath.params]

        if (Object.values(paramsByMethod).includes('query')) { localParams.push('query') }
        if (Object.values(paramsByMethod).includes('body')) { localParams.push('body') }
        /* process params with multipart data */
        if (Object.values(paramsByMethod).includes('formData')) {
          const formDataParams = Object.keys(paramsByMethod).filter((name) => paramsByMethod[name] === 'formData')
          formDataParams.forEach((name) => {
            localParams.push(`formData_${name}`)
          })
        }

        /* path params to url request */
        localParams.forEach((param, index) => {
          if (queryString.indexOf(param) !== -1) {
            queryString = queryString.replace(param, arguments[index])
          }
          /* if param is query string - setting query to params of options */
          if (param === 'query' && arguments[index]) {
            options.params = arguments[index]
          }
          /* if param is body - setting body to data of options */
          if (param === 'body' && arguments[index]) {
            options.data = arguments[index]
          }
          /* if param is body - setting body to data of options */
          if (param.indexOf('formData_') === 0 && arguments[index]) {
            if (!options.data) {
              options.data = new FData()
            }
            const name = param.split('_')[1]
            options.data.append(name, arguments[index])
            if (name === 'file') {
              if (!options.headers) { options.headers = {} }
              options.headers['Content-Type'] = `multipart/form-data; boundary=${options.data._boundary}`
            }
          }
        })
        /* last argument take like options */
        arguments[localParams.length]
          ? options = Object.assign(arguments[localParams.length], { url: queryString, method: method }, options)
          : options = Object.assign({ url: queryString, method: method }, options)

        return http.request(options)
      }
    })
    return result
  }, {})
}

export default (http) => {
  return CONFIGS.reduce((result, config) => {
    result[config.basePath.slice(1)] = generate(http, config)
    return result
  }, {})
}
