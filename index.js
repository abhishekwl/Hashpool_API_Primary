require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
//LOCAL
var { setupDatabase } = require('./util');

var applicationPort = process.env.NODE_ENV==='production'?process.env.PORT:8000;
global.sql = setupDatabase();

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.listen(applicationPort, '0.0.0.0', function() {
    console.log('[SERVER] Listening on port '+applicationPort);
});
