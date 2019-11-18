#! /usr/bin/env node
const commander = require('commander')
const updateNotifier = require('update-notifier')
const pkg = require('../package.json')
const i18n = require('../lib/index')

updateNotifier({ pkg }).notify()

commander
  .version(pkg.version)
  .description('A small tool to assist international development')

commander
  .command('init')
  .description('init i18n-tool config file')
  .action(i18n.init)

commander
  .command('extract')
  .description('extract chinese text from code')
  .action(i18n.extract)

commander
  .command('translate <lang>')
  .alias('fy')
  .description('translate chinese text to specified language')
  .action(i18n.translate)

commander.parse(process.argv)

if (process.argv.length === 2) {
  commander.outputHelp()
}
