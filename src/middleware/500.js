/* eslint-disable strict */
'use strict';

/**
 * 500 Middleware
 * @module middleware/500
 */

/**
 * Sends a JSON Formatted 404 Response
 * @param err {string} Error Text
 * @param req {object} Express Request Object
 * @param res {object} Express Response Object
 */

module.exports = (err, req, res) => {
  console.error('__SERVER_ERROR__', err);
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.write( JSON.stringify(err) );
  res.end();
};