const os = require('os')
const path = require('path')

const Flowtp = require('../lib/index')

const dir = path.join(os.homedir(), '.config/flowtp/')
const saveFile = path.join(dir, 'accounts.json')

let accounts = {}

try {
  accounts = require(saveFile)
} catch(err) {}

module.exports = {accounts, dir, Flowtp, saveFile}