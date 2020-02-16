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


// Routes
/**
 * This route give us  the token
 * @route POST/
 * @returns {object} 200 -
 */


authRouter.post('/signup', (req, res,next) => {
  let user = new Users(req.body);
  user.save()
    .then(data => {
      let token = user.generateToken(data);
      res.status(200).send(token);
    }).catch(next);
});


/**
 * This route give us  the token
 * @route POST/
 * @returns {object} 200 -
 */

authRouter.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.token);
});


/**
 * This route show us  the list of users
 * @route GET/
 * @returns {object} 200 -
 */

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
      res.status(200).send(req.token);
    })
    .catch(next);
});



/**
 * This route show us  the name of the user
 * @route GET/
 * @returns {object} 200 -
 */
authRouter.get('/user', bearerAuth, (req, res) => {
  res.status(200).json(req.user);
});

/**
 * Show all users stored in our Database
 */
authRouter.get('/public', (req, res) => {
  Users.list()
    .then(data=>{
      res.status(200).json(data);
    });});

/**
 * Show the user information for bearer level
 */
authRouter.get('/private', basicAuth, (req, res) => {
  res.status(200).json(req.user);
});

/**
 * route for readonly ACL with bearer Auth
 */
authRouter.get('/readonly', bearerAuth, accessControlList('read'), (req, res) => {
  res.status(200).send('OK!');
});

/**
 * route for create ACL with bearer Auth
 */
authRouter.get('/create', bearerAuth, accessControlList('create'), (req, res) => {
  res.status(200).send('OK!');
});

/**
 * route for Update ACL with bearer Auth
 */
authRouter.get('/update', bearerAuth, accessControlList('update'), (req, res) => {
  res.status(200).send('OK!');
});

/**
 * route for Delete ACL with bearer Auth
 */
authRouter.get('/delete', bearerAuth, accessControlList('delete'), (req, res) => {
  res.status(200).send('OK!');
});

/**
 * route for All CRUD ACL with bearer Auth
 */
authRouter.get('/everything', bearerAuth, accessControlList('read, create, update, delete'), (req, res) => {
  res.status(200).send('OK!');
});

module.exports = authRouter;