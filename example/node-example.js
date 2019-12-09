// let Connection = require('flespi-io-js/dist/node')
let Connection = require('../dist/node')

let connector = new Connection({ token: 'FlespiToken xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', socketConfig: { server: `wss://mqtt.flespi.io`, clientId: 'ThisIsMe!!!' } })
let count = 0

connector.socket.on('reconnect', () => { console.log('reconnect') })
connector.socket.on('close', () => { console.log('close') })
connector.socket.on('offline', () => {
  console.log('offline')
})
connector.socket.on('error', () => { console.log('error') })

connector.socket.on('connect', () => {
  connector.socket.subscribe({ name: '#',
    handler: (data, topic) => {
      console.log(count)
      count++
    } })
})
