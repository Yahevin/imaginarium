const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const config = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const compiler = webpack(config);
const cool = require('cool-ascii-faces');

const app = express();
const port = process.env.PORT || 8000;
const db = require('./routes/db/mydb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));
app.use(express.json());

app.get('/', (req, res) => res.render('index'));
app.get('/cool', (req, res) => res.send(cool()));

require('./routes/db/mydb');
require('./routes')(app, db);



app.listen(port, ()=>{
  console.log(`My app listening on port ${port}`);
});