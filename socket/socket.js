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

            // here adding user to socket
            Socket.on('Add user to socket', function (userId) {
                activeUsers[userId] = Socket.id;
                io.to(activeUsers[userId]).emit("Added", userId);
            });

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

            // it will call when user click on video call button in chatbox.ejs
            Socket.on('video call user1 initiate', function (data) {
                // it will open video chat window to another user
                Socket.to(activeUsers[data.id_user2]).emit('open video call window user2', {
                    id_user1: data.id_user2,
                    id_user2: data.id_user1,
                });
            });

            // called within the called page when user accept video call
            Socket.on('accept', function (data) { //ok
                // emits to the callie video page
                io.to(activeUsers["vid" + data.id_user2]).emit("FrontAnswer", data);
            });
            // called within the collie video page
            Socket.on('Answer', function (data) {
                // emits to the called video page
                io.to(activeUsers["vid" + data.id_user1]).emit("SignalAnswer", data);
            });

            Socket.on('Disconnect', function (data) {
                io.to(activeUsers[data.id_user2]).emit("Disconnect");
            });
            // called from the both collie and called video page
            Socket.on("Video call window Initiate", function (data) {
                activeUsers["vid" + data.id_user1] = Socket.id;
                io.to(activeUsers["vid" + data.id_user1]).emit('CreatePeer');
                io.to(activeUsers["vid" + data.id_user1]).emit('SessionActive');
            });

            // Socket.on("disconnect", () => {

            // });


        });
    }
}

module.exports = SocketConnection;