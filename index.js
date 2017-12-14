#!/usr/bin/env node

const Flowtp = require('./src/flowtp')
const fs = require('fs')
const accountsFile = './data/accounts.json'
let accounts = require(accountsFile)

let a = process.argv[2]
let name = process.argv[3]
let secret = process.argv[4]

if (a == 'add' && name && secret) {
  accounts[name] = secret
  fs.writeFileSync(accountsFile, JSON.stringify(accounts, null, 2))
  console.log(name, 'was added to the json file')
  process.exit(0)
}

if (a && accounts[a]) {
  console.log(new Flowtp(accounts[process.argv[2]]).toString())
} else if (a && !accounts[a]) {
  console.log(a, 'was not in the json file')
  console.log('add it with the command \'flowtp add', a, '<secret>\'')
} else {
  console.log('Usage: flowtp <account>')
  console.log('       flowtp add <account> <secret>')
}