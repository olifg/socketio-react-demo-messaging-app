import { Socket } from "socket.io";

const httpServer = require("http").createServer();
console.log('Created server', httpServer )

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

httpServer.listen(5000);
console.log('Server listening in port 5000')