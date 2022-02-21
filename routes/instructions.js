var express = require('express');
var os = require("os");
var QRCode = require('qrcode')

var hostname = os.hostname();
var router = express.Router();

if (!hostname.endsWith('.local')) {
  hostname = hostname + '.local'
}

var url = 'http://'+hostname+':3000'

router.get('/instructions', function(req, res, next) {
  
  QRCode.toDataURL(url, {width: 500, margin: 2}, function (err, qrcode) {
    res.render('instructions', {hostname, qrcode});
  })
});

module.exports = router;
