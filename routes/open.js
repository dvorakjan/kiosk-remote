var express = require('express');
var router = express.Router();
var { spawn } = require('child_process');

let chromium

router.post('/', function(req, res, next) {

  const url = req.body.url

  const bin = `/usr/bin/chromium-browser`
  const params = ['--noerrdialogs', '--disable-infobars', '--kiosk', url]
  const command = bin + ' ' + params.join(' ')

  if (chromium) {
    console.log('Stopping')
    chromium.kill('SIGKILL');
  }
  
  console.log('Running', command)
  chromium = spawn(bin, params)
  //chromium = spawn('sleep', ['10'])

  chromium.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  chromium.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  chromium.on('close', (code) => {
    console.log(`chromium process exited with code ${code}`);
    !res.headersSent && res.render('open', { command, code })
  });

  setTimeout(() => res.render('open', { command, code: 'timeout' }), 1000)
});

module.exports = router;
