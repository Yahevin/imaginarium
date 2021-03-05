/* eslint-disable import/named */
/* eslint-disable no-param-reassign */
import config from '../webpack.config.js';
import { RoomControllersPull } from './types';
import { SocketController } from './ws';

const express = require('express');
const webpack = require('webpack');
const http = require('http');
const webSocket = require('ws');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');

const compiler = webpack(config);
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;
const db = require('./db/mydb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }),
);
app.use(express.json());

require('./db/mydb');
require('./routes.js')(app, db);

const server = http.createServer(app);
const wss = new webSocket.Server({ server });

const rooms: RoomControllersPull = new Map();

wss.on('connection', (ws: any) => {
  ws.controller = new SocketController(app, db, ws, wss, rooms);

  ws.on('message', async (message: string) => {
    console.log('message', message);
    await ws.controller.reduce(JSON.parse(message));
  });

  ws.on('close', async () => {
    await ws.controller.terminate();
    console.log('close', ws.controller.room_id);
  });
});

server.listen(port, () => {
  console.log(`My app listening on port ${server.address().port}`);
});

app.use((req: any, res: any) => {
  res.redirect(`/#${req.url}`);
});
