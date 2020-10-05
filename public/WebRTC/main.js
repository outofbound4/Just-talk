
// var Peer = require('simple-peer');

const video1 = document.getElementById("video_id_user1");
const video2 = document.getElementById("video_id_user2");
let client = {};
// get stream
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        video1.srcObject = stream
        video1.play()

        //used to initialize a peer
        function InitPeer(type) {
            // alert("in initPeer");
            let peer = new SimplePeer({ initiator: (type == 'init') ? true : false, stream: stream, trickle: false })
            // alert("in initPeer, Peer : " + JSON.stringify(peer));
            peer.on('stream', function (stream) {
                alert("IN STREAM");
                // CreateVideo(stream)
            })
            //This isn't working in chrome; works perfectly in firefox.
            // peer.on('close', function () {
            //     document.getElementById("peerVideo").remove();
            //     peer.destroy()
            // })
            peer.on('data', function (data) {
                alert("in data")
                let decodedData = new TextDecoder('utf-8').decode(data)
                // let peervideo = document.querySelector('#peerVideo')
                // peervideo.style.filter = decodedData
            })
            return peer
        }

        //for peer of type init
        function MakePeer(id) { // it is in gaurav
            alert("in makepeer gaurav, id sarita : " + id.id_user2)
            client.gotAnswer = false
            let peer = InitPeer('init')
            peer.on('signal', function (data) {
                alert("in makePeer, data : " + JSON.stringify(data))
                if (!client.gotAnswer) {
                    socket.emit('Offer', { // it will give data to sarita
                        data: data,
                        id_user2: id.id_user2,
                    });
                }
            })
            client.peer = peer
            alert("in makePeer, Peer : " + JSON.stringify(client.peer));
        }

        function BackOffer(offer1) { //it is in sarita
            alert("in offerback : sarita, offr.data : " + JSON.stringify(offer1.data))
            // client.offer = offer1.data;
        }

        //for peer of type not init
        function FrontAnswer(id) {  // it is in sarita
            alert("in fontAnswer")
            let peer = InitPeer('notInit')
            alert("in font answer, Peer : " +JSON.stringify(peer));
            peer.on('signal', (data) => {
                alert("in fontAnswer, data : " + JSON.stringify(data));
                socket.emit('Answer', {
                    data: data,
                    id_user2: id.id_user2,
                })
            })
            alert("signal, fontanswer, signal : " + client.offer)
            peer.signal(client.offer)
            client.peer = peer
        }

        function SignalAnswer(answer) {
            alert("in signal answer gaurav, answer.data : " + answer.data)
            client.gotAnswer = true
            let peer = client.peer
            peer.signal(answer.data)
        }


        function SessionActive() {
            // document.write('Session Active. Please come back later');
            alert('Session Active. Please come back later');
        }



        function RemovePeer() {
            // document.getElementById("peerVideo").remove();
            // document.getElementById("muteText").remove();
            if (client.peer) {
                client.peer.destroy()
            }
        }

        socket.on('BackAccept', FrontAnswer)
        socket.on('BackOffer', BackOffer)
        socket.on('BackAnswer', SignalAnswer)
        socket.on('SessionActive', SessionActive)
        socket.on('CreatePeer', MakePeer)
        socket.on('Disconnect', RemovePeer)

        if (page == '0') {
            alert("video Initiator call");
            socket.emit("Initiator", {
                id_user1: id_user1,
                id_user2: id_user2,
            });
        }
    })
    .catch(err => document.write(err))


// // var peer;
// // function getStream() {
// //     alert("in getStream");
// // try {
// //     const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
// //     video1.srcObject = mediaStream;
// //     video1.play();
// // } catch (e) {
// //     console.error(e)
// // }
// // return mediaStream;
// function InitPeer(type) { //it is common

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//         .then(stream => {
//             video1.srcObject = stream;
//             video1.play();
//             alert("in init peer  after mediadevices");
//             let peer = new SimplePeer({ initiator: (type == 'init') ? true : false, stream: stream, trickle: false });
//             // alert(JSON.stringify(peer));
//             alert("Peer : " + peer);
//             peer.on('stream', function (stream) {
//                 video2.srcObject = stream;
//                 video2.play();
//             });
//             //This isn't working in chrome; works perfectly in firefox.
//             peer.on('close', function () {
//                 // document.getElementById("peerVideo").remove();
//                 peer.destroy()
//             });
//             peer.on('data', function (data) {
//                 let decodedData = new TextDecoder('utf-8').decode(data);
//                 console.log("peer.on(data)  : " + decodedData);
//                 // let peervideo = document.querySelector('#peerVideo')
//                 // peervideo.style.filter = decodedData
//             });
//             client.peer = peer;
//             // alert("initiator : " + initiator);
//             // alert("in init peer : " + JSON.stringify(client.peer));
//             alert("in init peer : " + client.peer);

//             // // use MediaStream Recording API
//             // const recorder = new MediaRecorder(stream);

//             // // fires every one second and passes an BlobEvent
//             // recorder.ondataavailable = event => {

//             //     // get the Blob from the event
//             //     blob = event.data;

//             //     // and send that blob to the server...

//             // };

//             // // make data available event fire every one second
//             // recorder.start();
//         })
//         .catch(err => document.write(err));
// }
// // //get stream
// // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
// //     .then(stream => {
// //         videostream = stream;
// //         video1.srcObject = stream;
// //         video1.play();

// // //used to initialize a peer
// // // it will create peer of both users
// // function InitPeer(type) { //it is common
// //     // let peer = new Peer({ initiator: (type == 'init') ? true : false, stream: stream, trickle: false })
// //     alert("in initialise peer : ")
// //     // peer.on('stream', function (stream) {
// //     //     video2.srcObject = stream;
// //     //     video2.play();
// //     // })
// //     //This isn't working in chrome; works perfectly in firefox.
// //     // peer.on('close', function () {
// //     //     document.getElementById("peerVideo").remove();
// //     //     peer.destroy()
// //     // })
// //     // peer.on('data', function (data) {
// //     //     let decodedData = new TextDecoder('utf-8').decode(data);
// //     //     console.log("peer.on(data)  : " + decodedData);
// //     //     // let peervideo = document.querySelector('#peerVideo')
// //     //     // peervideo.style.filter = decodedData
// //     // })
// //     // return peer
// // }
// // it is called when user start call
// //for peer of type init
// // socket.on('CreatePeer', function (id) { // it is in gaurav
// //     alert("in MakePeer, gaurav");
// //     // client.gotAnswer = false
// //     let peer = InitPeer('init')
// //     // peer.on('signal', function (data) {
// //     //     if (!client.gotAnswer) {
// //     //         // this is used in peer connectivity and give signal data to called user
// //     //         socket.emit('Offer', { // it will give data to sarita
// //     //             data: data,
// //     //             id_user2: id.id_user2,
// //     //         });
// //     //     }
// //     // });
// //     // client.peer = peer
// // });
// // function MakePeer(id) { // it is in gaurav
// //     alert("in MakePeer, gaurav");
// //     // client.gotAnswer = false
// //     let peer = InitPeer('init')
// //     // peer.on('signal', function (data) {
// //     //     if (!client.gotAnswer) {
// //     //         // this is used in peer connectivity and give signal data to called user
// //     //         socket.emit('Offer', { // it will give data to sarita
// //     //             data: data,
// //     //             id_user2: id.id_user2,
// //     //         });
// //     //     }
// //     // });
// //     // client.peer = peer
// // }

// // it initialises/give peer signal data to called user
// // it is called from callie through socket
// socket.on('BackOffer', function (offer) { //it is in sarita
//     alert("in offerback : sarita")
//     client.offer = offer.data;
//     // alert("IN BACK OFFER conn offer : " + JSON.stringify(client.offer));
//     alert("IN BACK OFFER conn offer : " + client.offer);
// });
// // function BackOffer(offer) { //it is in sarita
// //     alert("in offerback : sarita")
// //     returnOffer = offer.data;
// // }

// // it is called when user accept call
// //for peer of type not init
// // socket.on('BackAccept', function (offer) { // it is in sarita
// //     alert("in frontAnswer when accep click,  gauravid(iduser2) :" + offer.id_user2);
// //     let peer = InitPeer('notInit');
// //     peer.on('signal', (data) => {
// //         // this is used in peer connectivity and give signal data to callie user
// //         socket.emit('Answer', { // it will give data to gaurav
// //             data: data,
// //             // id_user1: offer.id_user1,
// //             id_user2: offer.id_user2,
// //         });
// //     });
// //     peer.signal(returnOffer);
// //     client.peer = peer;
// // });
// // function FrontAnswer(offer) { // it is in sarita
// //     alert("in frontAnswer when accep click,  gauravid(iduser2) :" + offer.id_user2);
// //     let peer = InitPeer('notInit');
// //     // peer.on('signal', (data) => {
// //     //     // this is used in peer connectivity and give signal data to callie user
// //     //     socket.emit('Answer', { // it will give data to gaurav
// //     //         data: data,
// //     //         // id_user1: offer.id_user1,
// //     //         id_user2: offer.id_user2,
// //     //     });
// //     // });
// //     // peer.signal(returnOffer);
// //     client.peer = peer;
// // }
// // it initialises/give peer signal data to callie user
// // it is called from called through socket
// socket.on('BackAnswer', function (answer) { // it is in gaurav
//     alert("SignalAnswer gaurav");
//     client.gotAnswer = true
//     let peer = client.peer
//     peer.signal(answer.data)
// });

// // function SignalAnswer(answer) { // it is in gaurav
// //     alert("SignalAnswer gaurav");
// //     client.gotAnswer = true
// //     let peer = client.peer
// //     peer.signal(answer.data)
// // }

// // it will hold the session and restrict othe call to connect
// // socket.on('SessionActive', function () {
// //     // document.write('Session Active. Please come back later')
// //     alert('Session Active. Please come back later');
// // });
// // function SessionActive() {
// //     // document.write('Session Active. Please come back later')
// //     alert('Session Active. Please come back later');
// // }

// // it will disconnect the peer connection
// // function RemovePeer() {
// //     // document.getElementById("peerVideo").remove();
// //     // document.getElementById("muteText").remove();
// //     // if (client.peer) {
// //     //     client.peer.destroy()
// //     // }
// // }

// // socket.on('BackAccept', FrontAnswer)
// // socket.on('BackOffer', BackOffer)
// // socket.on('BackAnswer', SignalAnswer)
// // socket.on('SessionActive', SessionActive)
// // socket.on('CreatePeer', MakePeer)
// // socket.on('Disconnect', RemovePeer)
// //     })
// //     .catch(err => document.write(err));
// // // alert(JSON.stringify(Promise));
// // alert(Promise);

// //used to initialize a peer
// // it will create peer of both users
// // function InitPeer(type) { //it is common
// //     // let stream = getStream();
// //     alert("in initPeer, stream : " + blob);
// //     let peer = new SimplePeer({ initiator: (type == 'init') ? true : false, stream: blob, trickle: false });
// //     alert("in init peer : " + JSON.stringify(peer));
// //     peer.on('stream', function (stream) {
// //         video2.srcObject = stream;
// //         video2.play();
// //     });
// //     //This isn't working in chrome; works perfectly in firefox.
// //     peer.on('close', function () {
// //         document.getElementById("peerVideo").remove();
// //         peer.destroy()
// //     });
// //     peer.on('data', function (data) {
// //         let decodedData = new TextDecoder('utf-8').decode(data);
// //         console.log("peer.on(data)  : " + decodedData);
// //         // let peervideo = document.querySelector('#peerVideo')
// //         // peervideo.style.filter = decodedData
// //     });
// //     return peer;
// // }

// function MakePeer(id) { // it is in gaurav
//     InitPeer('init');
//     // alert("in make peer, client.peer : " + JSON.stringify(client.peer));
//     alert("in make peer, client.peer : " + client.peer);
//     // client.gotAnswer = false

//     // client.peer.on('signal', function (data) {
//     //     if (!client.gotAnswer) {
//     //         // alert("in make peer : " + JSON.stringify(data));
//     //         // this is used in peer connectivity and give signal data to called user
//     //         socket.emit('Offer', { // it will give data to sarita
//     //             data: data,
//     //             id_user2: id.id_user2,
//     //         });
//     //     }
//     // });
//     // client.peer = peer
// }

// function FrontAnswer(offer) { // it is in sarita

//     // InitPeer('notInit');

//     alert("in font answer, signal : " + client.offer)
//     alert("in fontAnswer, peer : " + client.peer)
//     // let peer = client.peer;
//     client.peer.on('signal', (data) => {
//         // this is used in peer connectivity and give signal data to callie user
//         socket.emit('Answer', { // it will give data to gaurav
//             data: data,
//             // id_user1: offer.id_user1,
//             id_user2: offer.id_user2,
//         });
//     });
//     // let peer = client.peer;
//     client.peer.signal(client.offer);
//     // client.peer = peer;
// }

// function SessionActive() {
//     // document.write('Session Active. Please come back later')
//     alert('Session Active. Please come back later');
// }
