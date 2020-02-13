/* eslint-disable strict */
'use strict';

module.exports = (err, req, res) => {
  console.error('__SERVER_ERROR__', err);
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.write( JSON.stringify(err) );
  res.end();
};