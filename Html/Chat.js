/**
 * Created by kimberlyvasquez on 12/30/15.
 */
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var wbr= require('webrtc');
var binary = require('binaryjs');
var ss = require('socket.io-stream');
//var path = require('path');


/*  Socks*/


app.use(express.static(_dirname + '/public'));

mongoose.connect();

var ChatSchema = mongoose.Schema({
                create:Date,
                content:String,
                username:String,
                room:String

});

//create a model from the chat schema

var Chat = mongoose.model('Chat', ChatSchema);

//allow CORS

app.all('*', function(req, res, next){
    "use strict";
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type, Accept,X-Access-Token, X-Key');
    if(req.method == 'OPTIONS'){
        res.status(200).end();

    }else{
        next();
    }

});

// route for our index file
app.get('/', function(req, res) {
    //send the index.html in our public directory
    res.sendfile('index.html');
});

//This route is simply run only on first launch just to generate some chat history
app.post('/setup', function(req, res) {
    "use strict";

    var chatData = [];

    for (var c = 0; c < chatData.length; c++) {

        var newChat = new Chat(chatData[c]);

        newChat.save(function (err, savedChat) {

            console.log(savedChat);
        });

    }
    // send a response so the serv wont get stuck
    res.send('created');
});
    app.get('/msg', function(req,res){
        "use strict";
        //find
        Chat.find({
            'room': req.query.toLowerCase()}).exec(function (err, msgs) {
                res.json(msgs);


            });


    });

/*||||||||||||||||||||||||||||||||||*/

io.on('connection' , function(socket) {
    "use strict";

    var defaultRoom = 'Entry Point';

    var rooms = [];
    //Emit te rooms array
    socket.emit('setup', {rooms: rooms});


    //Listnes for new user
    socket.on('new user', function (data) {
        data.room = defaultRoom;
        // new user joins the fedault room

        socket.join(defaultRoom);
        // use message to everyone in the room
        io.in(defaultRoom).emit('user joined', data);
    });
    // listens for a room swith

    socket.on('switch room', function (data) {
        // handles joinging
        // log data

        socket.leave(data.oldRoom);
        socket.join(data.oldRoom);
        io.in(data.oldRoom).emit('user left', data);
        io.in(data.newRoom).emit('user joined', data);

    });

    // listens for a new chat message
    socket.on('new message', function (data) {

    // Create message

    var newMsg = new Chat({
        username: data.username,
        content: data.message,
        room: data.room.toLowerCase(),
        create: new Date()
    });
    newMsg.save(function (err, msg) {
        // send message  to those connected in the room
        io.in(msg.room).emit('message created', msg)

    });

});
});


