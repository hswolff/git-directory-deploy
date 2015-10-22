
module.exports = function(options) {
  options = options || {};

  // What branch we're going to deploy our sourceDirectory contents to.
  options.branch = options.branch || 'm2';

  // The git alias for what remote we're pushing changes to.
  options.remote = options.remote || 'origin';

  // Where our content we want to deploy resides. Needs to be .gitignored.
  options.src = options.src || '_site';

  // Relative to where this script is ran, where we should deploy the
  // sourceDirectory content on the deployBranch.
  options.target = options.target || '.';

  require('./src/index')(options);
}