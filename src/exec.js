const child_process = require('child_process');

var defaultLogOutput = false;

var defaultExecOptions = {
  cwd: process.cwd()
};

function exec() {
  var args = Array.prototype.slice.call(arguments);

  var lastIndex = args.length - 1;
  var lastArg = args[lastIndex];
  var logOutput = defaultLogOutput;
  // Optionally allow logging all output by having last arg be 'true'.
  if (typeof lastArg === 'boolean') {
    logOutput = lastArg;
    args.splice(lastIndex);
  }

  // Create default options object.
  if (typeof lastArg !== 'object') {
    args.push(defaultExecOptions);
  }

  return new Promise(function(resolve, reject) {

    args.push(function execCallback(err, stdout, stderr) {
      if (logOutput) {
        if (stdout) {
          console.log(stdout);
        }

        if (stderr) {
          console.log(stderr);
        }
      }

      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });

    child_process.exec.apply(child_process.exec, args);
  });
}

function execLater() {
  var args = arguments;
  return function() {
    return exec.apply(null, args);
  }
}

exports.exec = exec;
exports.execLater = execLater;

exports.configure = function(options) {
  if (options.verbose) {
    defaultLogOutput = options.verbose;
  }

  if (options.cwd) {
    defaultExecOptions.cwd = options.cwd;
  }
};
