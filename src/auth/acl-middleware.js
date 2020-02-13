/* eslint-disable strict */
'use strict';

const users = require('./users.js');


module.exports = (capability) => {

  return (req, res, next) => {
    try {
      // console.log(req.user.capabilities, capability);
      // console.log(users.checkCapabilities(capability, req.user.capabilities));
      if (users.checkCapabilities(capability, req.user.capabilities)) {
        next();
      }
      else {
        next('Access Denied');
      }
    } catch (e) {
      next('Invalid Login');
    }

  };

};