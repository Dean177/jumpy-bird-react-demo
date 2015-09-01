import express from 'express';
import { Server } from 'http';
import socketIo from 'socket.io';

const app = express();
const http = Server(app);
const io = socketIo(http);

app.get('/', (req, res) => {
    res.sendFile('/index.html', { root: __dirname });
});

io.on('connection', (socket) => {
    socket.on('event', (msg) => {

    });
    console.log("User connected");
});

http.listen(9000, () => {
    console.log("Listening");
});
