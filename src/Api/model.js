/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

class Model {
  constructor(schema){
    this.schema = schema;
  }
  /**
   * get all users or a particular user
   * @param {string} id 
   */
  get(id){
    if(id) return this.schema.findById(id);
    else return this.schema.find({});
  }

  /**
   * post new record to our Database
   * @param {object} record 
   */
  create(record){
    let newRecord =  new this.schema(record);
    return newRecord.save();
  }

  /**
   * Update record by ID 
   * @param {string} id 
   * @param {Object} record 
   */
  update(id, record){
    return this.schema.findByIdAndUpdate(id, record, {new: true});
  }

  /**
   * Delete record by ID 
   * @param {String} id 
   */
  delete(id){
    return this.schema.findByIdAndDelete(id);
  }
}

module.exports = Model;