
module.exports = function(options) {
  options = options || {};

  // What branch we're going to deploy our src directory contents to.
  options.branch = options.branch || 'gh-pages';

  // The git alias for what remote we're pushing changes to.
  options.remote = options.remote || 'origin';

  // Where our content we want to deploy resides. Needs to be .gitignored.
  options.src = options.src || '_site';

  // Relative to where this script is ran, where we should deploy the
  // src directory content on the remote branch.
  options.target = options.target || '.';

  // Whether we'll output all child_process operations to console.log.
  options.verbose = options.verbose || false;

  // What directory to run our child_process commands from by default.
  options.cwd = options.cwd || process.cwd();

  require('./src/index')(options);
};
