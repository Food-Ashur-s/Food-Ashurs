/* eslint-disable strict */
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js');

const mongoOption = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, mongoOption);

server.start(process.env.PORT);

