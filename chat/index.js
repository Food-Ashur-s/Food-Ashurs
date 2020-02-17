// // eslint-disable-next-line strict
// 'use strict';

// require('dotenv').config();
// const express = require('express');
// const sio = require('socket.io');
// const app = express();
// const server = app.listen(8080);

// const io = sio(server);
// const path = require('path');

// let users = {};
// let name = '';

// app.get('/chat/:name' , (req , res) =>{
//   name = req.params.name;
//   res.sendFile(path.join(__dirname , 'index.html'));
// });

// io.sockets.on('connection' ,(socket) => {
//   users[socket.id] = name;
//   socket.on('firstRoom' ,(room) =>{
//     socket.join(room);
//     socket.broadcast.in(room).emit('user is join our channel' , users[socket.id] );
//   });
//   socket.on(' first room for food channel have new massage' , (data) =>{
//     io.sockets.in('secondRoom').emit('Pravite chat channel' , users[socket.id] , ':' , data);
//   });
//   socket.on('secondRoom' , (room) =>{
//     socket.join(room);
//     socket.broadcast.in(room).emit('the user is join the chat' , users[socket.id]);
//   });
//   socket.on(' second room forfood channel have new massage' , (data) =>{
//     io.sockets.in('secondRoom').emit('Pravite chat channel' , users[socket.id] , ':' , data);
//   });
// });

const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = app.listen(8080);
const io = socketIO(server);
const path = require('path');

let users = {};
let name = '';

app.get('/:name', function(req, res){
  name = req.params.name;
  res.sendFile(path.join(__dirname, '/index.html'));
});

// socket
io.sockets.on('connection', function(socket){
  users[socket.id] = name;
  // node
  socket.on('nRoom', function(room){
    socket.join(room);
    socket.broadcast.in(room).emit('node new user', users[socket.id] + ' new user has joined');
  });

  socket.on('node new message', function(data){
    io.sockets.in('nRoom').emit('node news', users[socket.id] + ': ' + data);
  });

  // python
  socket.on('pRoom', function(room){
    socket.join(room);
    socket.broadcast.in(room).emit('python new user', users[socket.id] + ' new user has joined');
  });

  socket.on('python new message', function(data){
    io.sockets.in('pRoom').emit('python news', users[socket.id] + ': ' + data);
  });
});