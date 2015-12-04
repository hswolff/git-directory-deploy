#!/usr/bin/env node

var program = require('commander');

program
  .option('-s, --src [source]', 'Source folder.')
  .option('-t, --target [target]', 'Target folder.')
  .option('-b, --branch [branch]', 'Branch to deploy.')
  .option('-r, --remote [remote]', 'Git remote to push changes to.')
  .option('-v, --verbose', 'Enable verbose mode.')
  .parse(process.argv);

require('../index')(program);