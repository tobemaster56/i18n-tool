#! /usr/bin/env node

const program = require('commander');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const translator = require('../lib/init');

updateNotifier({ pkg }).notify();

program.version(pkg.version);

program
  .command('init')
  .description('init i18n-tool config file')
  .action();
