/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

const express = require('express');
const authRouter = express.Router();
const Users = require('./users.js');
const basicAuth = require('./basic-auth-middleware.js');
const oauth = require('./oauth-middleware.js');
const bearerAuth = require('./bearer-auth-middleware.js');
const accessControlList = require('./acl-middleware.js');


authRouter.post('/signup', (req, res,next) => {
  let user = new Users(req.body);
  user.save()
    .then(data => {
      let token = user.generateToken(data);
      res.status(200).send(token);
    }).catch(next);
});

authRouter.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.token);
});

authRouter.get('/users',(req, res) => {
  Users.list()
    .then(data=>{
      res.status(200).json(data);
    });
});

// authRouter.get('/oauth', oauth, (req, res) => {
// console.log(req.token);
//   res.status(200).send(req.token);
// });

authRouter.get('/oauth', (req,res,next) => {
  oauth.authorize(req)
    .then( token => {
      console.log(req.token);
      res.status(200).send(token);
    })
    .catch(next);
});


authRouter.get('/user', bearerAuth, (req, res) => {
  res.status(200).json(req.user);
});

authRouter.get('/public', (req, res) => {
  Users.list()
    .then(data=>{
      res.status(200).json(data);
    });});

authRouter.get('/private', basicAuth, (req, res) => {
  res.status(200).json(req.user);
});

authRouter.get('/readonly', bearerAuth, accessControlList('read'), (req, res) => {
  res.status(200).send('OK!');
});

authRouter.get('/create', bearerAuth, accessControlList('create'), (req, res) => {
  res.status(200).send('OK!');
});

authRouter.get('/update', bearerAuth, accessControlList('update'), (req, res) => {
  res.status(200).send('OK!');
});

authRouter.get('/delete', bearerAuth, accessControlList('delete'), (req, res) => {
  res.status(200).send('OK!');
});
authRouter.get('/everything', bearerAuth, accessControlList('read, create, update, delete'), (req, res) => {
  res.status(200).send('OK!');
});

module.exports = authRouter;