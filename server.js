const express = require('express');
const webpack = require('webpack');
const http = require('http');
const WebSocket = require('ws');
const SocketController = require('./routes/ws');
const bodyParser = require('body-parser');
const config = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const compiler = webpack(config);
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;
const db = require('./routes/db/mydb');

app.use(bodyParser.urlencoded({extended: true}));
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));
app.use(express.json());

require('./routes/db/mydb');
require('./routes')(app, db);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection', (ws) => {
  const Controller = new SocketController(app, db);

  ws.on('message', async (message) => {
    await Controller.reduce(JSON.parse(message));
  });

  ws.on('close', async () => {
    await Controller.terminate();
  });

  //send immediatly a feedback to the incoming connection
  ws.send('Hi there, I am a WebSocket server');
});

server.listen(port, () => {
  console.log(`My app listening on port ${server.address().port}`);
});
