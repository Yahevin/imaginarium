const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const port = 8000;
const compiler = webpack(config);
const db = require('./routes/db/mydb');
const config = require('./webpack.config.js');


app.use(bodyParser.urlencoded({ extended: true }));
// app.use(webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath,
// }));
app.use(express.json());

require('./routes/db/mydb');
require('./routes')(app, db);


app.listen(port, ()=>{
  console.log(`My app listening on port ${port}`);
});