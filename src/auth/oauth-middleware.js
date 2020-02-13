/* eslint-disable strict */
/* eslint-disable camelcase */
// 'use strict';

// const superagent = require('superagent');
// const Users = require('./users.js');

// const tokenUrl = 'https://github.com/login/oauth/access_token';
// const remoteAPI = 'https://api.github.com/user';
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const API_SERVER = process.env.API_SERVER;

// module.exports = async function authorize(req, res, next) {
//   try {
//     let code = req.query.code;
//     let remoteToken = await exchangeCodeForToken(code);
//     let remoteUser = await getRemoteUserInfo(remoteToken);
//     let [user, token] = await getUser(remoteUser);
//     req.user = user;
//     req.token = token;
//     next();
//   } catch(err) {
//     next(err);
//   }
// };

// async function exchangeCodeForToken(code) {
//   let tokenResponse = await superagent.post(tokenUrl).send({
//     code: code,
//     client_id: CLIENT_ID,
//     client_secret: CLIENT_SECRET,
//     redirect_uri: API_SERVER,
//     grant_type: 'authorization_code',
//   });

//   let access_token = tokenResponse.body.access_token;
//   return access_token;
// }

// async function getRemoteUserInfo(token) {
//   let userResponse = await superagent.get(remoteAPI)
//     .set('user-agent', 'express-app')
//     .set('Authorization', `token ${token}`);

//   let user = userResponse.body;
//   return user;
// }

// async function getUser(remoteUser) {
//   let userRecord = {
//     username: remoteUser.login,
//     password: 'oauthpassword',
//   };
//   let newUser = new Users(userRecord);
//   let user = await newUser.save();
//   let token = newUser.generateToken(user);

//   return [user, token];
// }

'use strict';

require('dotenv').config();
const superagent = require('superagent');
// const Users = require('../../model/users-model')
const Users = require('./users.js');
const authorize = (req) => {
// module.exports = async function authorize(req, res, next) {

  let code = req.query.code;
  console.log('(1) CODE:', code);

  return superagent.post('https://oauth2.googleapis.com/token')
    .type('form')
    .send({
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.API_SERVER,
      grant_type: 'authorization_code',
    })
    .then( response => {
      let access_token = response.body.access_token;
      console.log('(2) ACCESS TOKEN:', access_token);
      return access_token;
    })
    .then(token => {
      return superagent.get('https://openidconnect.googleapis.com/v1/userinfo')
        .set('Authorization', `Bearer ${token}`)
        .then( response => {
          let user = response.body;
          user.access_token = token;
          console.log('(3) GOOGLEUSER', user);
          return user;
        });
    })
    .then(oauthUser => {
      console.log('(4) CREATE ACCOUNT');
      return Users.createFromOAuth(oauthUser)
        .then(actualRealUser => {
          // let user = new Users();
          console.log('(5) ALMOST ...', actualRealUser);
          return Users.generateToken(actualRealUser)
            .then((token)=>{
              console.log('finalllllllllllllllly', token);
              req.token = token;
            }).catch(error => error);
        });
    });

};

module.exports = {authorize};