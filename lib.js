var { spawn } = require('child_process');

var chromium

module.exports = {
  open: open,
  reset: function(callback) {
    open('http://localhost:3000/instructions', callback)
  }
}

function open(url, callback) {
  try {
    const bin = `/usr/bin/chromium-browser`
    const params = ['--noerrdialogs', '--disable-infobars', '--kiosk', '--no-sandbox', url]
    const command = bin + ' ' + params.join(' ')
    let errorSent = false

    if (chromium) {
      console.log('Stopping')
      chromium.kill('SIGKILL');
    }
    
    console.log('Running', command)
    chromium = spawn(bin, params)
    //chromium = spawn('sleep', ['1'])

    chromium.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    chromium.on('error', function(err) {
      console.error('spawn error', err)
      errorSent = true
      callback(err)
    });
    
    chromium.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    chromium.on('close', (code) => {
      console.log(`chromium process exited with code ${code}`);
      !errorSent && callback(null, 'open', { command, code })

      setTimeout(() => callback(null, 'open', { command, code: 'timeout' }), 1000)
    });
  } catch (err) {
    console.error('open error', err)
    callback(err)
  }
}