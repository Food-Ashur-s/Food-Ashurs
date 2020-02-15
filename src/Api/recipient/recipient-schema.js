/* eslint-disable camelcase */
/* eslint-disable new-cap */
// eslint-disable-next-line strict
'use strict';
const mongoose = require('mongoose');

const recipientSchema = mongoose.Schema({
  name : { type : String , required : true},
  requestType : {type : String , required : true , enum : ['fast food', 'desserts', 'eastern food']},
  identity : { type : String , required : true},
  contactNumber : {type : String , required : true},
  description : {type : String , required : false},
});

module.exports = mongoose.model('recipient' , recipientSchema);