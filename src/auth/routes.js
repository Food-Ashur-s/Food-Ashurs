/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

const express = require('express');
const authRouter = express.Router();
const Users = require('./users.js');
const basicAuth = require('./basic-auth-middleware.js');
const oauth = require('./oauth-middleware.js');
const bearerAuth = require('./bearer-auth-middleware.js');
// const accessControlList = require('./acl-middleware.js');


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
 * @route POST/signin
 * @returns {object} 200 -
 */

authRouter.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.token);
});


/**
 * This route show us  the list of users
 * @route GET/users
 * @returns {object} 200 -
 */

authRouter.get('/users',(req, res) => {
  Users.list()
    .then(data=>{
      res.status(200).json(data);
    });
});

/**
 * This route show oauth
 * @route GET/user
 * @returns {object} 200 -
 */

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
  console.log(req);
  res.status(200).json(req.user);
});

module.exports = authRouter;