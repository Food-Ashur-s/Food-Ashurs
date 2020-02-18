/* eslint-disable camelcase */
/* eslint-disable strict */
'use strict';

const { server } = require('../server.js');
const supergose = require('@code-fellows/supergoose');
const mockRequest = supergose(server);

describe('Donor API Module', ()=>{
  it('should return all donor data by using get()',()=> {
    return mockRequest.get('/api/v1/donor')
      .then(data =>{
        expect(typeof data).toBe('object');
        expect(data.status).toBe(200);
      });
  }); // end of get all test

  it('should create a new donor by using post()',()=> {
    let testObject = { name: 'test user', type: 'eastern food', available_time: '1pam-1am',amount: '10 pesorn'};
    return mockRequest.post('/api/v1/donor')
      .send(testObject)
      .then(data =>{
        let results = data.body;
        expect(typeof data).toBe('object');
        expect(data.status).toBe(200);
        Object.keys(testObject).forEach(value => {
          expect(results[value]).toEqual(testObject[value]);
        });
      });
  });  // end of post  test

  it('should return a particular donor data by using get() , by using ID ',()=> {
    let testObject = { name: 'test user', type: 'eastern food', available_time: '1pam-1am',amount: '10 pesorn'};
    return mockRequest.post('/api/v1/donor')
      .send(testObject)
      .then(data =>{
        return mockRequest.get(`/api/v1/donor/${data.body._id}`)
          .then(data => {
            let results = data.body;
            expect(typeof data).toBe('object');
            expect(data.status).toBe(200);
            Object.keys(testObject).forEach(value => {
              expect(results[value]).toEqual(testObject[value]);
            });
          });
      });
  });  // end of get by ID test


  it('should update a particular donor data by using update() , by using ID ',()=> {
    let testObject = { name: 'test user', type: 'eastern food', available_time: '1pam-1am',amount: '10 pesorn'};
    return mockRequest.post('/api/v1/donor')
      .send(testObject)
      .then(data =>{
        let updatetest = { name: 'testUpdate', type: 'eastern food', available_time: '1pam-1am',amount: '10 pesorn'};
        return mockRequest.put(`/api/v1/donor/${data.body._id}`)
          .send(updatetest)
          .then(data => {
            let results = data.body;
            expect(typeof data).toBe('object');
            expect(data.status).toBe(200);
            Object.keys(updatetest).forEach(value => {
              expect(results[value]).toEqual(updatetest[value]);
            });
          });
      });
  });  // end of update by ID test

  it('should delete a particular donor data by using delete() , by using ID ',()=> {
    let testObject = { name: 'test user', type: 'eastern food', available_time: '1pam-1am',amount: '10 pesorn'};
    return mockRequest.post('/api/v1/donor')
      .send(testObject)
      .then(data =>{
        return mockRequest.delete(`/api/v1/donor/${data.body._id}`)
          .then(data => {
            expect(typeof data.body).toBe('object');
            expect(data.status).toBe(200);
            expect(data.body).toStrictEqual({});
          });
      });
  });  // end of Delete by ID test

}); // end of API testing for Donor

describe('Recipient API Module', ()=>{
  it('should return all Recipient data by using get()',()=> {
    return mockRequest.get('/api/v1/recipient')
      .then(data =>{
        expect(typeof data).toBe('object');
        expect(data.status).toBe(200);
      });
  }); // end of get all test

  it('should create a new Recipient by using post()',()=> {
    let testObject = { name: 'test user', requestType: 'fast food', identity: 'person',contactNumber: '0777123456',description :'hungry ' };
    return mockRequest.post('/api/v1/recipient')
      .send(testObject)
      .then(data =>{
        let results = data.body;
        expect(typeof data.body).toBe('object');
        expect(data.status).toBe(200);
        Object.keys(testObject).forEach(value => {
          expect(results[value]).toEqual(testObject[value]);
        });
      });
  });  // end of post test

  it('should return a particular Recipient data by using get() , by using ID', () =>{
    let testObject = { name: 'test user', requestType: 'fast food', identity: 'person',contactNumber: '0777123456',description :'hungry ' };
    return mockRequest.post('/api/v1/recipient')
      .send(testObject)
      .then(data =>{
        return mockRequest.get(`/api/v1/recipient/${data.body._id}`)
          .then( result =>{
            let results = result.body;
            expect(typeof data.body).toBe('object');
            expect(data.status).toBe(200);
            Object.keys(testObject).forEach(value =>{
              expect(results[value]).toEqual(testObject[value]);
            });
          });
      });
  });
  it('should update a particular recipient data by using update() , by using ID' , () => {
    let recipientTestObj = {name: 'test user', requestType: 'fast food', identity: 'person',contactNumber: '0777123456',description :'hungry ' };
    return mockRequest.post('/api/v1/recipient')
      .send(recipientTestObj)
      .then( data => {
        let updateTestObj = {name: 'update user', requestType: 'fast food', identity: 'person',contactNumber: '0777123456',description :'not hungry ' };
        return mockRequest.put(`/api/v1/recipient/${data.body._id}`)
          .send(updateTestObj)
          .then( result =>{
            let results = result.body;
            Object.keys(updateTestObj).forEach(value => {
              expect(results[value]).toEqual(updateTestObj[value]);
            });
          });
      });
  });

  it('it should delete a particular donor data by using delete() , by using ID ',()=>{
    let recipientTestObj = {name: 'test user', requestType: 'fast food', identity: 'person',contactNumber: '0777123456',description :'hungry ' };
    return mockRequest.post('/api/v1/recipient')
      .send(recipientTestObj)
      .then(result=> {
        return mockRequest.delete(`/api/v1/recipient/${result.body.id}`)
          .then( data =>{
            expect(typeof data.body).toBe('object');
            expect(data.status).toBe(200);
            expect(data.body).toStrictEqual({});
          });
      });
  } );
}); // end of API testing for Recipient
