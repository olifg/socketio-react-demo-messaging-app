"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var socketio = require('socket.io');
var http = require('http');
var router = express.Router();
var cors = require('cors');
var app = express();
var PORT = process.env.PORT || 5000;
var server = http.createServer(app);
var io = socketio(server);
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
router.get('/', function (req, res) {
    res.send('Backend server.');
});
app.use(router);
app.use(cors);
server.listen(PORT, function () {
    console.log("Server listening on port ".concat(PORT));
});
