/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

class Model {
  constructor(schema){
    this.schema = schema;
  }
  get(id){
    if(id) return this.schema.findByOne(id);
    else return this.schema.find({});
  }

  create(record){
    let newRecord =  new this.schema(record);
    return newRecord.save();
  }
  update(id, record){
    return this.schema.findByIdAndUpdate(id, record, {new: true});
  }
  delete(id){
    return this.schema.deleteMany({id});
  }
}

module.exports = Model;