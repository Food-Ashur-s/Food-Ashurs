/* eslint-disable no-unused-vars */
/* eslint-disable strict */
'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true, enum:['donor', 'recipient']},
});

// users.statics.checkCapabilities = (capability, role)=>{
//   console.log(capability, role);

//   let doner = ['read', 'create', 'update', 'delete'];
//   let recipient = ['read', 'create', 'update', 'delete'];

//     if(role === 'doner' ){
//       for(let i = 0; i < admin.length;i++){
//         if(doner[i]) return true;
//       }
//     }
//     if(role === 'editor' ){
//       for(let i = 0; i < editor.length;i++){
//         if(editor[i]) return true;
//       }
//     }
//     if(role === 'user' ){
//       for(let i = 0; i < user.length;i++){
//         if(user[i]) return true;
//       }
//     }

// };
users.pre('save', async function(){
  if (!users.username) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

users.statics.authenticateBasic = function(auth) {
  return this.findOne({username:auth.username})
    .then(user => user.passCompare(auth.password))
    .catch(console.error);
};

users.methods.passCompare = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

users.methods.generateToken = function(user) {
  let userData = {
    username: user.username,
    capabilities: user.role,
  };
  //   console.log(userData);
  let token = jwt.sign(userData, process.env.SECRET);
  return token;
};

users.statics.list =  async function(){
  let results = await this.find({});
  return results;
};

users.statics.authenticateToken = async function(token){
  try {
    let tokenObject = jwt.verify(token, process.env.SECRET);

    if (tokenObject.username) {
      return Promise.resolve(tokenObject);
    } else {
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject();
  }
};
module.exports = mongoose.model('users',users);