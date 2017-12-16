#!/usr/bin/env node

const fs = require('fs')
const os = require('os')
const path = require('path')

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