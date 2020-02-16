/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

const express = require('express');
const apiRoutes = express.Router();

const donor = require('./donor/donor.js');
const recipient = require('./recipient/recipient.js');

function dynamicModel(req,res,next){
  let model = req.params.model;

  switch (model) {
  case 'donor':
    req.model = donor;
    next();
    return;
  case 'recipient':
    req.model = recipient;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
}

apiRoutes.param('model' , dynamicModel);

apiRoutes.get('/api/v1/:model' , handelGetAll);
apiRoutes.post('/api/v1/:model' , handelPost);
apiRoutes.get('/api/v1/:model/:id' , handelGetOne);
apiRoutes.put('/api/v1/:model/:id' , handelUpdate);
apiRoutes.delete('/api/v1/:model/:id' , handelDelete);

/**
 * Retrieve all users from database
 * @param {object} req
 * @param {object} res
 * @param {MW} next
 */
function handelGetAll(req,res,next){
  req.model.get()
    .then(results =>{
      let count = results.length;
      res.json({count,results});

    }).catch(next);
}

/**
 * Retrive one user information
 * @param {Object} req
 * @param {object} res
 * @param {MW} next
 */
function handelGetOne(req,res,next){
  let id = req.params.id;
  req.model.get(id)
    .then(record =>{
      res.json(record);
    }).catch(next);
}

/**
 * Post a user info then get all informayion based on that user
 * @param {Object} req
 * @param {object} res
 * @param {MW} next
 */
function handelPost(req,res,next){
  if (req.params.model === 'recipient') {
    req.model.create(req.body)
      .then(results=>{
        req.model.get(results._id)
          .then(data=>{
            res.json(data);
          }).catch(next);
      });
  }else{
    req.model.create(req.body)
      .then(results=>{
        res.json(results);
      }).catch(next);
  }
}

/**
 * Update user's info based on ID
 * @param {Object} req
 * @param {Object} res
 * @param {MW} next
 */
function handelUpdate(req,res,next){
  let id = req.params.id;
  req.model.update(id, req.body)
    .then(results =>{
      res.json(results);
    }).catch(next);
}

/**
 * Remove one user from Database based on ID
 * @param {Object} req
 * @param {Object} res
 * @param {MW} next
 */
function handelDelete(req,res,next){
  let id = req.params.id;
  console.log(id);
  req.model.delete(id)
    .then(results =>{
      res.send('Item Deleted');
    }).catch(next);
}
module.exports = apiRoutes;

