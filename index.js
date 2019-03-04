const WebSocket = require('ws')
// const wss = new WebSocket.Server({ port: 8080 })
const wss = new WebSocket.Server({ port: 3000 })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message)
  })
  ws.send('something')
})
