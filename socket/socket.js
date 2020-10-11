// socket connection
var Socket = require("socket.io");
var io;
var activeUsers = [];
var lastSeen = [];
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
                lastSeen[Socket.id] = 'Online';
                io.to(activeUsers[userId]).emit("Added", userId);
            });

            // here sending message to a particular person
            Socket.on('REQUEST LAST SEEN', function (data) {
                io.to(activeUsers[data.id_user1]).emit("RESPONSE LAST SEEN", {
                    lastSeen: lastSeen[activeUsers[data.id_user2]],
                });
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
                Socket.to(activeUsers[data.id_user2]).emit('typing_off', {
                    lastSeen: lastSeen[activeUsers[data.id_user1]],
                });
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
                console.log("in accept, sarita");
                io.to(activeUsers["vid" + data.id_user1]).emit("BackAccept", {
                    id_user2: data.id_user2,
                });
            });
            // called within the collie video page
            Socket.on('Answer', function (data) {
                console.log("in ans from sarita, to gaurav(iduser2) :" + data.id_user2)
                // emits to the called video page
                io.to(activeUsers["vid" + data.id_user2]).emit("BackAnswer", {
                    data: data.data,
                });
            });

            Socket.on('Offer', function (data1) {
                console.log("in offer from gaurav,  to sarita(iduser2) : " + data1.id_user2);
                // emits to the called video page
                io.to(activeUsers["vid" + data1.id_user2]).emit("BackOffer", {
                    data: data1.data,
                });
            });

            // called from the both collie and called video page
            Socket.on("Initiator", function (data) {
                console.log("in initiator, gaurav, socketId : " + activeUsers["vid" + data.id_user1]);

                io.to(activeUsers["vid" + data.id_user1]).emit("CreatePeer", {
                    id_user2: data.id_user2,
                });
            });

            Socket.on('Socket connection video call', function (data) {
                activeUsers["vid" + data.id_user1] = Socket.id;
                console.log("video connection initiate : " + activeUsers["vid" + data.id_user1])
            });
            
            Socket.on('Disconnect', function (data) {
                // io.to(activeUsers[data.id_user2]).emit("Disconnect");
            });

            Socket.on("disconnect", () => {
                lastSeen[Socket.id] = new Date();
            });
        });
    }
}

module.exports = SocketConnection;