var showLog = false;

exports.log = function() {
  if (showLog) {
    console.log.apply(console, arguments);
  }
}

exports.configure = function(options) {
  if (options.verbose) {
    showLog = true;
  }
}