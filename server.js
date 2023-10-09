const express = require('express'); //import the Express.js framework into your Node.js application.
const http = require('http');   //handle connection in browser
const socketIo = require('socket.io'); // import socket library whis is using for the to handle WebSocket connections.

const app = express();
const server = http.createServer(app); //creating an HTTP server instance 
const io = socketIo(server);

app.use(express.static('/public')); //setting up static file serving in an Express

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`); //Its show socket connection Id

  socket.on('draw', (data) => {
    // Broadcast the drawing data to all connected clients, including sender
    io.emit('draw', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000; //connection portal which show output
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
