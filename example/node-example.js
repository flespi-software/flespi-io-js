let Connection = require('../dist/node')

let connector = new Connection({token: 'FlespiToken AfGbg3xxwxX3C8WVHeHuZe4thoujmcKNgeMk79FuvslVo5GT7beWd6fjkxsvy26E', socketConfig: {server: `ws://localhost:9016`, clientId: 'ThisIsMe!!!'}})
let count = 0

connector.socket.on('reconnect', () => { console.log('reconnect') })
connector.socket.on('close', () => { console.log('close') })
connector.socket.on('offline', () => {
    console.log('offline')
})
connector.socket.on('error', () => { console.log('error') })

connector.socket.on('connect', () => {
    connector.socket.subscribe({name: '#', handler: (data, topic) => {
            console.log(count)
            count++
        }})
})
