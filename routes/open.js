var express = require('express');
var router = express.Router();
var { open, reset } = require('../lib')

router.post('/', function(req, res, next) {
  const url = req.body.url
  open(url, (err, params) => {
    if (!res.headersSent) {
      console.log('open callback, rendering', res.headersSent, err, params)
      res.render(err ? 'error' : 'open', {error: err, ...params})
    } else {
      console.log('open callback, not rendering', res.headersSent, err, params)
    }
  })
});

router.get('/stop', function(req, res, next) {
  reset(() => {
    !res.headersSent && res.render('index')
  })
});

module.exports = router;
