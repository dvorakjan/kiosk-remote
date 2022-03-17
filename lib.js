var { spawn } = require("child_process");
var os = require("os");

var chromium;

module.exports = {
  open: open,
  reset: function (callback) {
    const port = process.env.PORT || "3000";
    open(getUrl() + `/instructions`, callback);
  },
  getUrl,
};

function open(url, callback) {
  try {
    const bin = `sudo`;
    const params = [
      "-u",
      "pi",
      "/usr/bin/chromium-browser",
      "--noerrdialogs",
      "--disable-infobars",
      "--kiosk",
      "--no-sandbox",
      url,
    ];
    const command = bin + " " + params.join(" ");
    let errorSent = false;

    if (chromium) {
      console.log("Stopping");
      chromium.kill("SIGKILL");
    }

    console.log("Running", command);
    chromium = spawn(bin, params);
    //chromium = spawn('sleep', ['10'])

    chromium.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    chromium.on("error", function (err) {
      console.error("spawn error", err);
      errorSent = true;
      callback(err);
    });

    chromium.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    chromium.on("close", (code) => {
      console.log(
        `chromium process exited with code ${code}, err sent`,
        errorSent
      );
      if (!errorSent) {
        console.log("close - calling callback");
        callback(null, "open", { command, code });
      }
    });

    setTimeout(
      () => callback(null, "open", { command, code: "timeout" }),
      1000
    );
  } catch (err) {
    console.error("open error", err);
    callback(err);
  }
}

function getUrl() {
  var hostname = os.hostname();
  var port = process.env.PORT || "3000";

  if (!hostname.endsWith(".local")) {
    hostname = hostname + ".local";
  }

  return `http://${hostname}${port == "80" ? "" : `:${port}`}`;
}
