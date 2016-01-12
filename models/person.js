'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let personSchema = new Schema({
  name:{ type: String},
  location: {type: String},
  gender: {type: String},
  phone: { type: String},
  line_type: {type: String },
  valid: { type: String},
  is_connected: {type: String}
})


module.exports = mongoose.model('Person', personSchema);
