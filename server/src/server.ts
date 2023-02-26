import { Socket, Server } from "socket.io";

const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = express.Router();
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketio(server);



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


router.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Backend server.')
})

app.use(router);
app.use(cors);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
