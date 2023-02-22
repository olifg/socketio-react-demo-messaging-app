import { Socket } from "socket.io";

const httpServer = require("https").createServer();
const express = require('express')
const app = express()

const port = 3000


const io = require('socket.io')(httpServer, {
    rejectUnauthorized: false, // WARN: please do not do this in production
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
})

io.on('connection', (socket: Socket) => {
    const id = socket.handshake.query.id;

    console.log('id: ', id);
    if (!id) return;
    socket.join(id);

    socket.on('send-message', ({
        recipients,
        text
    }) => {
        console.log('received message!')
        recipients.forEach((recipient: string) => {
            const newRecipients = recipients.filter((r: string) => r !== recipient)
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, senderId: id, text
            })
        })
    })
})


app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

httpServer.listen(5000);
console.log('SocketIO Server listening in port 5000')