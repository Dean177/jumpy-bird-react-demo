import express from 'express';
import { Server } from 'http';
import { v1 as uuid } from 'node-uuid';
import socketIo from 'socket.io';

import { Uuid, HighScores, NameUpdate, UpdateScore } from './shared/Constants/FlappyActionTypes';
import { Goto } from './shared/Constants/SlidesActionTypes';

const app = express();
const http = Server(app);
const io = socketIo(http);

app.get('/', (req, res) => { res.sendFile('/index.html', { root: __dirname }); });

let highScores = [];

io.on('connection', (socket) => {
  socket.emit(Uuid, uuid());
  socket.emit(HighScores, highScores);

  socket.on(UpdateScore, (highScoreEvent) => {

    let  {uuid, name, score} = highScoreEvent;
    let players = highScores.filter((player) => { return player.uuid === uuid});
    if (players.length == 1) {
      players[0].score = score;
    } else {
      highScores.push(highScoreEvent);
    }
    highScores.sort((a, b) => { return b.score - a.score});
    io.emit(HighScores, highScores);
  });

  socket.on(NameUpdate, ({ uuid, name }) => {
    let players = highScores.filter((player) => { return player.uuid === uuid});
    if (players.length == 1) {
      players[0].name = name;
    } else {
      highScores.push({uuid, name, score: 0});
    }
    io.emit(HighScores, highScores);
  });

  socket.on(Goto, (slideNumber) => { socket.broadcast.emit(Goto, slideNumber); });
});

http.listen(9000, () => { console.log("Listening for connections"); });