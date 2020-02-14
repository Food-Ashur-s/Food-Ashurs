/* eslint-disable strict */
'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


/**
 * Sends a schema connected to the database 
 * @param username {string} express the name for the user
 * @param password {string} express the password for the user
 * @param role {string} express the role for the user
 * @returns {object}

 */

const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email:{type: String , required : true},
  role: {type: String, required: true, enum:['donor', 'recipient']},
});

// const capabilities = {
//   admin: ['read, create, update, delete'],
//   editor: ['read, create, update'],
//   user: ['read'],
// };
users.statics.checkCapabilities = (capability, role)=>{
  console.log(capability, role);
  // let arr = [];
  // Object.values(capabilities).forEach(val=>{
  //   arr.push(val.includes(capability));
  // });
  let admin = ['read, create, update, delete'];
  let editor = ['read, create, update'];
  let user = ['read'];

  if(role === 'admin' ){
    for(let i = 0; i < admin.length;i++){
      if(admin[i]) return true;
    }
  }
  if(role === 'editor' ){
    for(let i = 0; i < editor.length;i++){
      if(editor[i]) return true;
    }
  }
  if(role === 'user' ){
    for(let i = 0; i < user.length;i++){
      if(user[i]) return true;
    }
  }
  // Object.values(capabilities).forEach(val=>{
  //   console.log(val.includes(capability));
  // });
};
users.pre('save', async function(){
  if (!users.username) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
users.statics.createFromOAuth = function(oauthUser) {
  console.log('user', oauthUser);

  if(!oauthUser) { return Promise.reject('Validation Error'); }

  return this.findOne( {email: `${oauthUser.email}`} )
    .then(user => {
      if( !user ) { throw new Error('User Not Found'); }
      console.log('Welcome Back', user.username);
      return user;
    })
    .catch( error => {
      console.log('Creating new user');
      let username = oauthUser.email;
      let password = 'none';
      let email = oauthUser.email;
      return this.create({username, password, email});
    });
};

/**
 * compare the values
 * @param username {string} express the username for the user
 * @returns {boolean}

 */


users.statics.authenticateBasic = function(auth) {
  return this.findOne({username:auth.username})
    .then(user => user.passCompare(auth.password))
    .catch(console.error);
};


/**
 * compare the values
 * @param password {string} express the password for the user
 * @returns {boolean}

 */

users.methods.passCompare = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};


/**
 * generate a token  
 * @param username
 * @param capabilities
 * @returns {string} 

 */

users.methods.generateToken = function(user) {
  let userData = {
    username: user.email,
    capabilities: user.role,
  };
  console.log(userData);
  let token = jwt.sign(userData, process.env.SECRET);
  // console.log('klllllllllllllllllllllllll',token);
  return token;
  // let token = jwt.sign({ username: user.username}, process.env.SECRET);
  // return token;
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