// eslint-disable-next-line strict
'use strict';

const Model = require('../model.js');
const schema = require('./recipient-schema.js');

class Recipient extends Model {}

module.exports = new Recipient(schema);