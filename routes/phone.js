'use strict';
let express = require('express');
let router = express.Router();
let request = require('request');
let Person = require('../models/person');



router.post('/:phone',function (req, res, next) {
 let phoneNumber = req.params.phone;
 request(`https://proapi.whitepages.com/2.1/phone.json?api_key=ab26513e4c846d3e769fa0f70ce59ffa&phone_number=${phoneNumber}`,
 function (err, resp, body) {
  body = JSON.parse(body)

   let person = {}
    person.phone = body.results[0].phone_number;
    person.line_type = body.results[0].line_type;
    person.valid = body.results[0].is_valid;
    person.is_connected = body.results[0].is_connected;
    person.name = body.results[0].belongs_to[0].best_name;
    person.gender = body.results[0].belongs_to[0].gender;
    person.location =body.results[0].belongs_to[0].best_location.address;
    let newPerson = new Person(person);

    newPerson.save(function (err, savedPerson) {
      res.status(err ? 400:200).send(err || person)
    })
 })
})

router.get('/', function (req, res, next) {
  Person.find({},function (err, people) {
    res.status(err ? 400:200)
  })

})

module.exports = router;
