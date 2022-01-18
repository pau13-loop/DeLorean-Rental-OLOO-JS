var express = require('express');
var router = express.Router();

//* HOME PAGE *//
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Rent-a-car OLOO !' });
});

module.exports = router;
