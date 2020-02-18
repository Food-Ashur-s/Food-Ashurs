/* eslint-disable camelcase */
/* eslint-disable new-cap */
// eslint-disable-next-line strict
'use strict';
const mongoose = require('mongoose');

/**
 * recipientSchema
 */
const recipientSchema = mongoose.Schema({
  name : { type : String , required : true},
  requestType : {type : String , required : true , enum : ['fast food', 'desserts', 'eastern food']},
  identity : { type : String , required : true},
  contactNumber : {type : String , required : true},
  description : {type : String , required : false},
},{toOBject:{virtuals: true}, toJSON: {virtuals: true}});

/**
 * the virtual side in Donor schema
 */
recipientSchema.virtual('requestRecipient',{
  ref: 'donor',
  localField: 'requestType',
  foreignField: 'type',
  justOne: false,
});

/**
 * connect the database and make it ready before anything else
 *
 */
recipientSchema.pre('findOne', function (){
  try{
    this.populate('requestRecipient');
  }catch(e){
    console.error(e);
  }
});

module.exports = mongoose.model('recipient' , recipientSchema);
