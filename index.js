const express = require('express');
var app = require('express')();
const http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT;

//global
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "null");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "null");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
//end of global

app.get('/', function (req, res, next) {
  console.log("PORT",PORT)
  console. log(req. socket. remoteAddress);
  console. log(req. ip);
  res.json({data:"lol",
            ip:req. ip});
});

app.get('/socket.io/', function (req, res, next) {
  console.log("query",req.query)
  
  res.json({data:"JSON.parse(io)"})
});
io.on('connection', function (socket) {
  console.log('socket conectado',socket.id);
  io.emit('conectado', {texto: 'Nuevo socket conectado: ' + socket.id +`<br>`} );

  socket.on('disconnect', () => {
    console.log('socket desconectado',socket.id);
    io.emit('desconectado', {texto: 'Socket desconectado.'+ socket.id +`<br>`});
  
  });

  socket.on('chat:mensaje', (data) => {
    io.emit('chat:mensaje', data);
  });

  socket.on('chat:escribiendo', (usuario) => {
    socket.broadcast.emit('chat:escribiendo', usuario);
  });

});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
