
var express = require('express');
var router = express.Router();
var request = require('request')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WhitePage Node.JS Reverse Phone' });
});

module.exports = router;
