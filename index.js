const express = require('express');

const http = require('http');
const socketIo = require('socket.io');
const EventEmitter = require('events');
const bodyParser = require('body-parser');
const app = express();
const eventEmitter = new EventEmitter();
const server = http.createServer(app);
const io = socketIo(server);

// app.use(express.json()); // Middleware สำหรับแปลง JSON
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.post('/control', (req, res) => {
  const data = req.body; // แยก object จาก request body
  console.log('Received data:', data);
  io.sockets.emit('control', data);
  res.send(data);
});

app.post('/display', (req, res) => {
  const data = req.body; // แยก object จาก request body
  console.log('Received data:', data);
  io.sockets.emit('display', data);
  res.send(data);
});


// ตั้งค่า Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

