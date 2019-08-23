require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//LOCAL
const { setupDatabase } = require('./util');

const applicationPort = process.env.NODE_ENV==='production'?process.env.PORT:8000;
global.sql = setupDatabase();

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.listen(applicationPort, '0.0.0.0', ()=>{
    console.log('[SERVER] Listening on port '+applicationPort);
});
