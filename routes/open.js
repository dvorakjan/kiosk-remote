var express = require('express');
var router = express.Router();
var { open, reset } = require('../lib')

router.post('/', function(req, res, next) {
  const url = req.body.url
  open(url, (err, params) => {
    !res.headersSent && res.render(err ? 'error' : 'open', {error: err, ...params})
  })
});

router.get('/stop', function(req, res, next) {
  reset(() => {
    !res.headersSent && res.render('index')
  })
});

module.exports = router;
