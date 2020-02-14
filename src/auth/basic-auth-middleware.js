/* eslint-disable strict */
'use strict';

const Users = require('./users.js');

module.exports = (req, res, next) => {

  let [authType, encodedString] = req.headers.authorization.split(/\s+/);

  switch(authType.toLowerCase()) {
  case 'basic':
    return authBasic(encodedString);
  default:
    break;
  }

  function authBasic(authString) {
    let base64Buffer = Buffer.from(authString,'base64');
    let bufferString = base64Buffer.toString();
    let [username,password] = bufferString.split(':');
    let auth = {username,password};
    return Users.authenticateBasic(auth)
      .then( user =>{
        req.user = user;
        req.token = user.generateToken(user);
        next();
      });
  }
};