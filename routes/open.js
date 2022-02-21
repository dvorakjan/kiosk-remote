var express = require('express');
var router = express.Router();
var { open } = require('../lib')

router.post('/', function(req, res, next) {
  const url = req.body.url
  open(url, params => res.render('open', res, params))
});

module.exports = router;
