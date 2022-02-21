var express = require('express');
var router = express.Router();
var { open } = require('../lib')

router.post('/', function(req, res, next) {
  const url = req.body.url
  open(url, (err, params) => {
    !res.headersSent && res.render(err ? 'error' : 'open', {error: err, ...params})
  })
});

module.exports = router;
