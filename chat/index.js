// // eslint-disable-next-line strict
// 'use strict';

// require('dotenv').config();
// const express = require('express');
// const sio = require('socket.io');
// const app = express();
// const server = app.listen(process.env.PORT);

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