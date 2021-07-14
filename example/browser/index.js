// import Connection from 'flespi-io-js'
import Connection from '../../src/index'
//import MQTT from '../../src/mqtt'
// import HTTP from '../../src/rest'

const connector = new Connection({ socketConfig: { clientId: 'ThisIsMe!', mqttSettings: { protocolVersion: 5 } } })
// const connector = new MQTT({ mqttSettings: { protocolVersion: 5 }, clientId: 'ThisIsMejfjgfj!' })
// const connector = new HTTP()

const inputToken = document.querySelector('#token'),
  submitToken = document.querySelector('#submit'),
  getChannelsButton = document.querySelector('#getChannels'),
  fileButton = document.querySelector('#fileData')

submitToken.addEventListener('click', () => {
  connector.token = inputToken.value
  connector.socket.on('connect', async (connack) => {
    console.log(connack)
    const grants = await connector.socket.subscribe({ name: '#', handler: render })
    connector.socket.publish('custom/info', JSON.stringify({ hello: 'world' }))
    console.log(JSON.stringify(grants))
  })
})

getChannelsButton.addEventListener('click', async () => {
  // let channelsData = await connector.gw.getChannels('all', {})
  const channelsData = await connector.http.gw.channels.get('all', {})
  document.querySelector('#http').innerHTML = JSON.stringify(channelsData.data.result, null, 1)
})

function render (data, topic, opts) {
  const element = document.createElement('div'),
    parent = document.querySelector('#mqtt')
  element.innerHTML = `${topic}: ${data.toString()} : ${JSON.stringify(opts)}`
  parent.appendChild(element)
}

fileButton.addEventListener('change', async function (e) {
  // for nodejs: connector.storage.postCdnsFiles(ID, fs.createReadStream('./file'), JSON.stringify({'auto_ttl': 11234}))
  await connector.http.storage.cdns.files.post(7, fileButton.files[0], JSON.stringify({ auto_ttl: 11234 }))
})
