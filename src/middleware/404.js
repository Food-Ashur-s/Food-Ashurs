/* eslint-disable strict */
'use strict';
/**
 * 404 Middleware
 * @module middleware/404
 */

/**
 * Sends a JSON Formatted 404 Response
 * @param req {object} Express Request Object
 * @param res {object} Express Response Object
 */
module.exports = (req,res) => {
  let error = { error: 'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.write(JSON.stringify(error));
  res.end();
};
