'use strict';
let express = require('express');
let router = express.Router();
let request = require('request');
let Person = require('../models/person');

let APIKEY = process.env.WHITEPAGE_API_KEY

router.post('/:phone',function (req, res, next) {
 let phoneNumber = req.params.phone;
 request(`https://proapi.whitepages.com/2.1/phone.json?api_key=${APIKEY}&phone_number=${phoneNumber}`,
 function (err, resp, body) {
   if(err) res.status(400).send(err)
  body = JSON.parse(body)
  console.log(body);
   let person = {}
    person.phone = body.results[0].phone_number;
    person.line_type = body.results[0].line_type;
    person.valid = body.results[0].is_valid;
    person.is_connected = body.results[0].is_connected;
    person.name = body.results[0].belongs_to[0].best_name;
    person.gender = body.results[0].belongs_to[0].gender;
    person.location = body.results[0].best_location.address;
    console.log(person, 'person to be saved');
    let newPerson = new Person(person);

    newPerson.save(function (err, savedPerson) {
      res.status(err ? 400:200).send(err || person);
    })
 })
})

router.get('/', function (req, res, next) {
  Person.find({},function (err, people) {
    res.status(err ? 400:200).send(err || people);
  })
})

module.exports = router;
