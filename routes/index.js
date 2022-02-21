var express = require('express');
var os = require("os");

var router = express.Router();
var hostname = os.hostname();
var device = hostname.replace('.local', '')

router.get('/', function(req, res, next) {
  res.render('index', { device });
});

module.exports = router;
