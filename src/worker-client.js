/* WorkerAsyncClient — main-thread proxy that talks to mqtt-worker.js via postMessage */
/* Drop-in replacement for AsyncClient (src/flespi-mqtt-io/async.js) */

let _nextId = 1

class WorkerEventEmitter {
  constructor () {
    this._handlers = {}
    this.connected = false
    this.disconnecting = false
    this.options = {}
  }

  on (event, handler) {
    if (!this._handlers[event]) { this._handlers[event] = [] }
    this._handlers[event].push(handler)
    return this
  }

  off (event, handler) {
    if (!this._handlers[event]) return this
    if (handler) {
      this._handlers[event] = this._handlers[event].filter(h => h !== handler)
    } else {
      delete this._handlers[event]
    }
    return this
  }

  removeListener (event, handler) {
    return this.off(event, handler)
  }

  emit (event, ...args) {
    const handlers = this._handlers[event]
    if (handlers) {
      handlers.forEach(h => { try { h(...args) } catch (e) { console.error(e) } })
    }
  }
}

class WorkerAsyncClient {
  constructor (worker, url, options) {
    this._worker = worker
    this._client = new WorkerEventEmitter()
    this._pending = {} /* { id: { resolve, reject } } */

    this._worker.onmessage = (e) => {
      const msg = e.data

      switch (msg.type) {
        case 'event': {
          if (msg.event === 'message') {
            /* Deserialize: ArrayBuffer → Buffer, rebuild packet */
            const topic = msg.args[0]
            const buf = typeof Buffer !== 'undefined' ? Buffer.from(msg.args[1]) : msg.args[1]
            const packet = msg.args[2]
            this._client.emit('message', topic, buf, packet)
          } else {
            /* Reconstruct Error objects */
            const args = msg.args.map(arg => {
              if (arg && typeof arg === 'object' && arg.message && 'code' in arg) {
                const err = new Error(arg.message)
                err.code = arg.code
                return err
              }
              return arg
            })
            this._client.emit(msg.event, ...args)
          }
          break
        }

        case 'result': {
          const p = this._pending[msg.id]
          if (p) {
            delete this._pending[msg.id]
            p.resolve(msg.result)
          }
          break
        }

        case 'error': {
          const p = this._pending[msg.id]
          if (p) {
            delete this._pending[msg.id]
            const err = new Error(msg.error.message)
            err.code = msg.error.code
            p.reject(err)
          }
          break
        }

        case 'state': {
          this._client.connected = msg.connected
          this._client.disconnecting = msg.disconnecting
          break
        }
      }
    }

    this._worker.onerror = (e) => {
      const err = new Error(e.message || 'Worker error')
      this._client.emit('error', err)
    }

    /* Send initial connect command */
    const id = _nextId++
    this._worker.postMessage({ type: 'connect', id, url, options })
  }

  get connected () {
    return this._client.connected
  }

  get reconnecting () {
    return false
  }

  _sendCommand (type, payload) {
    return new Promise((resolve, reject) => {
      const id = _nextId++
      this._pending[id] = { resolve, reject }
      this._worker.postMessage(Object.assign({ type, id }, payload))
    })
  }

  subscribe (topic, options) {
    return this._sendCommand('subscribe', { topic, options })
  }

  unsubscribe (topic, options) {
    return this._sendCommand('unsubscribe', { topic, options })
  }

  publish (topic, message, options) {
    const payload = { topic, options }
    const transferable = []
    if (message instanceof ArrayBuffer) {
      payload.message = message
      transferable.push(message)
    } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(message)) {
      const ab = message.buffer.slice(message.byteOffset, message.byteOffset + message.byteLength)
      payload.message = ab
      transferable.push(ab)
    } else {
      payload.message = message
    }
    const id = _nextId++
    return new Promise((resolve, reject) => {
      this._pending[id] = { resolve, reject }
      this._worker.postMessage(Object.assign({ type: 'publish', id }, payload), transferable)
    })
  }

  end (force) {
    return this._sendCommand('end', { force }).then(result => {
      this._client.connected = false
      this._client.disconnecting = false
      return result
    })
  }

  on (...args) {
    return this._client.on(...args)
  }

  off (...args) {
    return this._client.off(...args)
  }

  removeListener (...args) {
    return this._client.removeListener(...args)
  }
}

export default WorkerAsyncClient
