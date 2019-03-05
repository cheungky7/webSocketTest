const WebSocket = require('ws')
// const wss = new WebSocket.Server({ port: 8080 })
const wss = new WebSocket.Server({ port: 3000 })

let IntervalTask = null

let EchoCounter = 0

function echoToClient(ws, JsonData) {
 // ws.send(JsonData.msg)
  const data = JSON.stringify({
    type: 'reply',
    data: JsonData.msg
  })

  ws.send(data)
}

function echoToClientN(ws, JsonData) {

  if (IntervalTask != null) {
    clearInterval(IntervalTask)
  }

  IntervalTask = setInterval(() => {
    try {
    //  ws.send(`Rely${EchoCounter}: ${JsonData.msg}`)

      const data = JSON.stringify({
        type: 'reply',
        data: `Rely${EchoCounter}: ${JsonData.msg}`
      })

      ws.send(data)

      EchoCounter += 1
      if (EchoCounter > 999999) {
        EchoCounter = 0
      }
    } catch (e) {
      console.log(e)
      clearInterval(IntervalTask)
    }
  }, JsonData.N)
}


wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // console.log('received: %s', message)
    try {
      const JsonData = JSON.parse(message)
      console.log(JsonData)
      if (JsonData.action === 'echo') {
        echoToClient(ws, JsonData)
      }

      if (JsonData.action === 'echoN') {
        echoToClientN(ws, JsonData)
      }

    } catch (e) {
      console.log(e)
    }
  })
  // ws.send('something')
  // setInterval(() => { ws.send('something testing') }, 100)
  ws.on('close', () => {
    console.log('disconnected')
    clearInterval(IntervalTask)
  })

})
