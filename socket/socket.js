// socket connection
var Socket = require("socket.io");
var io;
class SocketConnection {
    // constructor 

    constructor(server) {
        io = Socket(server);
    }

    listenConnection() {
        // console.log(this.io);
        io.on('connection', function (Socket) {
            console.log("made Socket connection id : " + Socket.id);
            Socket.on('chat', function (data) {
                io.sockets.emit('chat', data);
            });
            Socket.on('typing', function (data) {
                Socket.broadcast.emit('typing', data);
            });
            Socket.on('remove_typing', function (data) {
                Socket.broadcast.emit('remove_typing', data);
            });
            
        });
    }
}

module.exports = SocketConnection;