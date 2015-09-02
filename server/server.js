import express from 'express';
import { Server } from 'http';
import { v1 as uuid }from 'node-uuid';
import socketIo from 'socket.io';

const app = express();
const http = Server(app);
const io = socketIo(http);

app.get('/', (req, res) => {
    res.sendFile('/index.html', { root: __dirname });
});

let highScores = [];

io.on('connection', (socket) => {
  socket.emit('uuid', uuid());
  socket.emit('highScores', highScores);

  socket.on('highScore', (highScoreEvent) => {
    let  {uuid, name, score} = highScoreEvent;
    let players = highScores.filter((player) => { return player.uuid === uuid});
    if (players.length == 1) {
      players[0].score = score;
    } else {
      highScores.push(highScoreEvent);
    }
    highScores.sort((a, b) => { return b.score - a.score});
    io.emit('highScores', highScores);
  });

  socket.on('nameChange', (nameChangeEvent) => {
    let  {uuid, name} = nameChangeEvent;
    let players = highScores.filter((player) => { return player.uuid === uuid});
    if (players.length == 1) {
      players[0].name = name;
    } else {
      highScores.push({uuid, name, score: 0});
    }
    io.emit('highScores', highScores);
  });
});

http.listen(9000, () => {
    console.log("Listening");
});
