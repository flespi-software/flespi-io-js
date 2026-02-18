/* Web Worker entry point for MQTT client */
/* This runs inside a Web Worker to prevent browser tab throttling from killing the connection */

import mqtt from 'mqtt'

let client = null

function sendState () {
  self.postMessage({
    type: 'state',
    connected: client ? client.connected : false,
    disconnecting: client ? client.disconnecting : false
  })
}

function serializePacket (packet) {
  if (!packet) return null
  const result = {}
  if (packet.properties) {
    result.properties = {}
    if (packet.properties.subscriptionIdentifier !== undefined) {
      result.properties.subscriptionIdentifier = packet.properties.subscriptionIdentifier
    }
    if (packet.properties.userProperties !== undefined) {
      result.properties.userProperties = packet.properties.userProperties
    }
  }
  return result
}

self.onmessage = function (e) {
  const msg = e.data

  switch (msg.type) {
    case 'connect': {
      if (client) {
        try { client.end(true) } catch (_) {}
      }
      const opts = Object.assign({}, msg.options, { forceNativeWebSocket: true })
      client = mqtt.connect(msg.url, opts)

      const events = ['connect', 'error', 'close', 'disconnect', 'reconnect', 'offline', 'end']
      events.forEach(event => {
        client.on(event, (...args) => {
          const serializedArgs = args.map(arg => {
            if (arg instanceof Error) return { message: arg.message, code: arg.code }
            if (arg && typeof arg === 'object') {
              try { JSON.stringify(arg); return arg } catch (_) { return String(arg) }
            }
            return arg
          })
          self.postMessage({ type: 'event', event, args: serializedArgs })
          sendState()
        })
      })

      client.on('message', (topic, message, packet) => {
        const buf = message instanceof ArrayBuffer ? message
          : (message && message.buffer) ? message.buffer.slice(message.byteOffset, message.byteOffset + message.byteLength)
          : new ArrayBuffer(0)
        const serializedPacket = serializePacket(packet)
        self.postMessage(
          { type: 'event', event: 'message', args: [topic, buf, serializedPacket] },
          [buf]
        )
      })

      self.postMessage({ type: 'result', id: msg.id, result: true })
      break
    }

    case 'subscribe': {
      if (!client) {
        self.postMessage({ type: 'error', id: msg.id, error: { message: 'No client' } })
        break
      }
      client.subscribe(msg.topic, msg.options, (err, result) => {
        if (err) {
          self.postMessage({ type: 'error', id: msg.id, error: { message: err.message, code: err.code } })
        } else {
          self.postMessage({ type: 'result', id: msg.id, result })
        }
      })
      break
    }

    case 'unsubscribe': {
      if (!client) {
        self.postMessage({ type: 'error', id: msg.id, error: { message: 'No client' } })
        break
      }
      client.unsubscribe(msg.topic, msg.options, (err, result) => {
        if (err) {
          self.postMessage({ type: 'error', id: msg.id, error: { message: err.message, code: err.code } })
        } else {
          self.postMessage({ type: 'result', id: msg.id, result })
        }
      })
      break
    }

    case 'publish': {
      if (!client) {
        self.postMessage({ type: 'error', id: msg.id, error: { message: 'No client' } })
        break
      }
      const message = msg.message instanceof ArrayBuffer ? Buffer.from(msg.message) : msg.message
      client.publish(msg.topic, message, msg.options, (err, result) => {
        if (err) {
          self.postMessage({ type: 'error', id: msg.id, error: { message: err.message, code: err.code } })
        } else {
          self.postMessage({ type: 'result', id: msg.id, result })
        }
      })
      break
    }

    case 'end': {
      if (!client) {
        self.postMessage({ type: 'result', id: msg.id, result: true })
        break
      }
      client.end(msg.force, () => {
        client = null
        self.postMessage({ type: 'result', id: msg.id, result: true })
        sendState()
      })
      break
    }
  }
}
