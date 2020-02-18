/* eslint-disable strict */
'use strict';

const Model = require('../model.js');
const schema = require('./donor-schema.js');

class Donor extends Model {}

module.exports = new Donor(schema);