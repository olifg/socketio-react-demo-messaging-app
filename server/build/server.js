"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpServer = require("http").createServer();
var express = require('express');
var app = express();
var port = 3000;
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
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
httpServer.listen(5000);
console.log('SocketIO Server listening in port 5000');
