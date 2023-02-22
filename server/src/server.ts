import { Socket, Server } from "socket.io";

const express = require('express')
const app = express()

const port = 3000


const io = new Server(5000)

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

console.log('SocketIO Server listening in port 5000')