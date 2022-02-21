var express = require('express');
var os = require("os");
var QRCode = require('qrcode')
var {getUrl} = require('../lib')

var hostname = os.hostname();
var router = express.Router();

router.get('/instructions', function(req, res, next) {
  
  QRCode.toDataURL(getUrl(), {width: 500, margin: 2}, function (err, qrcode) {
    res.render('instructions', {hostname, qrcode});
  })
});

module.exports = router;
