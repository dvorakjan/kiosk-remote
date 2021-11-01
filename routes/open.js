var express = require('express');
var router = express.Router();
var { exec } = require('child_process');

router.post('/', function(req, res, next) {

  const url = req.body.url
  const command = `/usr/bin/chromium-browser --noerrdialogs --disable-infobars --kiosk ${url} &`
  
  console.log('Running', command)
  exec(command, (err, stdout, stderr) => {
    if (err) {
      res.render('open', { error });
      console.error(err)
    } else {
      res.render('open', { url });
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });

});

module.exports = router;
