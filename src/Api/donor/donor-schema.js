/* eslint-disable camelcase */
/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

const mongoose = require('mongoose');

const donor_schema = mongoose.Schema({
  name: {type:String, required: true},
  type: {type:String, required: true, enum: ['fast food', 'desserts', 'eastern food']},
  available_time: {type:String, required: true},
  amount: {type: String},
},{toOBject:{virtuals: true}, toJSON: {virtuals: true}});

module.exports = mongoose.model('donor', donor_schema);