import Connection from 'flespi-io-js'

let connector = new Connection({mqttConfig: {clientId: 'ThisIsMe!'}})

let inputToken = document.querySelector('#token'),
    submitToken = document.querySelector('#submit'),
    getChannelsButton = document.querySelector('#getChannels')

submitToken.addEventListener('click', async () => {
    connector.token = inputToken.value
    let id = await connector.mqtt.subscribe({name: '#', handler: render})
})

getChannelsButton.addEventListener('click', async () => {
    let channelsData = await connector.getChannels('all', {})
    document.querySelector('#http').innerHTML = JSON.stringify(channelsData.data.result, null, 1)
})

function render (data) {
    let element = document.createElement('pre'),
        parent = document.querySelector('#mqtt')
    element.innerHTML = JSON.stringify(JSON.parse(data.toString()), null, 1)
    parent.appendChild(element)
}