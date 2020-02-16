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


function handelGetAll(req,res,next){
  req.model.get()
    .then(results =>{
      let count = results.length;
      res.json({count,results});

    }).catch(next);
}

function handelGetOne(req,res,next){
  let id = req.params.id;
  req.model.get(id)
    .then(record =>{
      res.json(record);
    }).catch(next);
}

function handelPost(req,res,next){
  // if (req.model === 'recipient') {
  //   req.model.create(req.body)
  //     .then(results=>{
  //       donor.get()
  //         .then(data =>{
  //           Object.values.forEach(element => {
  //             console.log(element);
  //           });
  //         });
  //     });

  // }else
  req.model.create(req.body)
    .then(results=>{
      res.json(results);
    }).catch(next);
}

function handelUpdate(req,res,next){
  let id = req.params.id;
  req.model.update(id, req.body)
    .then(results =>{
      res.json(results);
    }).catch(next);
}

function handelDelete(req,res,next){
  let id = req.params.id;
  console.log(id);
  req.model.delete(id)
    .then(results =>{
      res.send('Item Deleted');
    }).catch(next);
}
module.exports = apiRoutes;

