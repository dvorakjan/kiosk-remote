var { spawn } = require('child_process');

var chromium

module.exports = {
  open: function open(url, res, callback) {
    try {
      const bin = `/usr/bin/chromium-browser`
      const params = ['--noerrdialogs', '--disable-infobars', '--kiosk', '--no-sandbox', url]
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

      chromium.on('error', function(err) {
        console.error('spawn error', err)
        callback(err)
      });
      
      chromium.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      
      chromium.on('close', (code) => {
        console.log(`chromium process exited with code ${code}`);
        (!res || !res.headersSent) && callback(null, 'open', { command, code })
      });

      setTimeout(() => callback(null, 'open', { command, code: 'timeout' }), 1000)
    } catch (err) {
      console.error('open error', err)
      callback(err)
    }
  }
}