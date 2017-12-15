#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const os = require('os')

const Flowtp = require('./src/flowtp')

const flowdir = path.join(os.homedir(), '.config/flowtp/')
const accountsFile = path.join(flowdir, 'accounts.json')

function writeEmptyJSON(dir) {
  fs.writeFileSync(dir, JSON.stringify({}))
}

// This could be moved to a postinstall script
try {
  fs.mkdirSync(flowdir) // throws error if folder already exists
  writeEmptyJSON(accountsFile) // write empty file if the folder was just created
} catch (e) {
  try {
    fs.statSync(accountsFile) // throws error if file doesn't exist
  } catch (e) {
    writeEmptyJSON(accountsFile) // write empty file when one doesn't exist
  }
}

let accounts = require(accountsFile) || {}

let command = process.argv[2]
let name = process.argv[3]
let secret = process.argv[4]

if (command == 'add') {
  if (name && secret) {
    accounts[name] = secret
    fs.writeFileSync(accountsFile, JSON.stringify(accounts, null, 2))
    console.log(name, 'was added to the JSON file')
  } else {
    console.log('Usage: flowtp add <account> <secret>')
  }
  process.exit(0)
}

if (command == 'remove') {
  if (name) {
    delete accounts[name]
    fs.writeFileSync(accountsFile, JSON.stringify(accounts, null, 2))
    console.log(name, 'was removed from the JSON file')
  } else {
    console.log('Usage: flowtp remove <account>')
  }
  process.exit(0)
}

if (command == 'list') {
  console.log(JSON.stringify(accounts, null, 2))
  process.exit(0)
}

if (command && accounts[command]) {
  console.log(new Flowtp(accounts[process.argv[2]]).toString())
} else if (command && !accounts[command]) {
  console.log(command, 'was not in the JSON file')
  console.log('add it with the command \'flowtp add', command, '<secret>\'')
} else {
  console.log('Usage: flowtp <account>')
  console.log('       flowtp add <account> <secret>')
  console.log('       flowtp remove <account>')
}

process.exit(0)