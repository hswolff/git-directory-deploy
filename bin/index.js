#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2), {
  string: [
    'branch',
    'remote',
    'src',
    'target'
  ]
});

if (argv.v) {
  argv.verbose = argv.v;
  delete argv.v;
}

require('../index')(argv);