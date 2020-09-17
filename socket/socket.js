// socket connection
var Socket = require("socket.io");
var io;
var activeUsers = [];
class SocketConnection {

    // constructor 
    constructor(server) {
        io = Socket(server);
    }
    // this function called in app.js
    listenConnection() {
        io.on('connection', function (Socket) {
            console.log("made Socket connection id : " + Socket.id);

            // here sending message to a particular person
            Socket.on('sending_message', function (data) {
                io.to(activeUsers[data.id_user2]).emit("receiving_message", data);
            });
            // called when user type message to another user
            Socket.on('typing_on', function (data) {
                Socket.to(activeUsers[data.id_user2]).emit('typing_on', data);
            });
            // called when user type backspace
            Socket.on('typing_off', function (data) {
                Socket.to(activeUsers[data.id_user2]).emit('typing_off', data);
            });
            // called after user login or on chat page load
            Socket.on("new user", function (data) {
                activeUsers[data] = Socket.id;
                io.to(activeUsers[data]).emit("new user", data);
            });

            Socket.on("disconnect", () => {

            });
        });
    }
}

module.exports = SocketConnection;