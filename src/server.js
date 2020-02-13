/* eslint-disable strict */
'use strict';

//3rd party
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const aoutRoutes = require('./auth/routes.js');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(aoutRoutes);



module.exports = {
  server: app,
  start: port =>{
    let PORT = port || process.env.PORT || 3000;
    app.listen(()=> console.log(`I hear you on PORT: ${PORT}`));
  },
};

