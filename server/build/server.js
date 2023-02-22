"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpServer = require("http").createServer();
console.log('Created server', httpServer);
var io = require('socket.io')(httpServer, {
    rejectUnauthorized: false,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', function (socket) {
    var id = socket.handshake.query.id;
    console.log('id: ', id);
    if (!id)
        return;
    socket.join(id);
    socket.on('send-message', function (_a) {
        var recipients = _a.recipients, text = _a.text;
        console.log('received message!');
        recipients.forEach(function (recipient) {
            var newRecipients = recipients.filter(function (r) { return r !== recipient; });
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, senderId: id,
                text: text
            });
        });
    });
});
httpServer.listen(5000);
console.log('Server listening in port 5000');
