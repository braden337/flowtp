#!/usr/bin/env node

const flow = require('commander');

const {accounts, Flowtp} = require('./setup')
const {save} = require('./utils')

let name = ''
let secret = ''

flow
  .version('1.1.1')
  .option('-l, --list', 'show all the secrets')
  .option('-r, --remove', 'remove an entry with given name')
  .option('-a, --add', 'add an entry with given name and secret')
  .option('-w, --watch', 'watch TOTPs being generated forever')
  .arguments('<name> [secret]')
  .action(function(n, s) {
    name = n
    secret = s
  }).parse(process.argv);

if (flow.list) {
  console.log(JSON.stringify(accounts, null, 2))
  process.exit(0)
}
else if (flow.add && secret && !accounts[name]) {
  accounts[name] = secret
  save(accounts)
  console.log('Saved:', name)
  process.exit(0)
}

if (accounts[name]) { 
  if (flow.remove) {
    delete accounts[name]
    save(accounts)
    console.log('Removed:', name)
    process.exit(0)
  }
  else if (flow.watch) {
    let flowtp = new Flowtp(accounts[name])
    let last = flowtp.toString()
    setInterval(function() {
      let now = flowtp.toString()
      if (now !== last) {
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        console.log(last)
        last = now
      }
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(flowtp.term())
    }, 500)
  }
  else {
    process.stdout.write(new Flowtp(accounts[name]).term())
  }
}
else {
  console.log('There is no entry for', name)
}

if (!flow.args.length) flow.help()