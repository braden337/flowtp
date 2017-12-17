const fs = require('fs')
const {saveFile, dir} = require('./setup')

function writeJSON(data) {
  fs.writeFileSync(saveFile, JSON.stringify(data, null, 2))
}

function makeConfigDir() {
  fs.mkdirSync(dir)
}

function save(accounts) {
  try {
    writeJSON(accounts)
  } catch(e) {
    makeConfigDir()
    writeJSON(accounts)
  }
}

module.exports = {save}