'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let personSchema = new Schema({
  name:{ type: String},
  address: {type: String},
  gender: {type: String},
  phone: { type: String},
  line_type: {type: String },
  valid: { type: String},
  is_connected: {type: String}
})


let Person = mongoose.model('Person', personSchema);






// person.phone = body.results[0].phone_number;
// person.line_type = body.results[0].line_type;
// person.valid = body.results[0].is_valid;
// person.is_connected = body.results[0].is_connected;
// person.name = body.results[0].belongs_to[0].best_name;
// person.gender = body.results[0].belongs_to[0].gender;
// person.location =body.results[0].belongs_to[0].best_location.address;
