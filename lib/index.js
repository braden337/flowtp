const colors = require('colors');
const crypto = require('crypto')
const b32 = require('thirty-two')

class Flowtp {

  constructor() {
    if (arguments[0]) {
      this.secret = b32.decode(arguments[0])
    } else {
      this.secret = this.constructor.generateSecret()
    }
  }

  code(timestep) {
    let message = Buffer.alloc(8)
    for (let i = 7; timestep > 0; i--) {
      message[i] = timestep & 0xff
      timestep >>>= 8
    }

    const digest = crypto.createHmac('sha1', this.secret)
                      .update(message).digest()
    const offset = digest[19] & 0xf
    const code = ((digest[offset] & 0x7f) << 24) |
                ((digest[offset + 1] & 0xff) << 16) |
                ((digest[offset + 2] & 0xff) << 8) |
                (digest[offset + 3] & 0xff)

    return (code % Math.pow(10, 6)).toString().padStart(6, 0)
  }

  time() {
    return (new Date().valueOf() / 1000) / 30
  }

  now() {
    return this.code(Math.floor(this.time()))
  }
  
  term() {
    let t = this.time()
    let c = this.constructor.pretty(this.code(t))
    if (this.constructor.old(t)) {
      return c.red
    }
    return c.green
  }
  
  at(time) {
    return this.code(Math.floor(time / 30))
  }
  
  verify(otp) {
    return this.now() === otp
  }
  
  verifyAt(otp, time) {
    return this.at(time) === otp
  }
  
  toString() {
    return this.constructor.pretty(this.now())
  }
  
  show() {
    console.log(this.toString())
  }
  
  static old(time) {
    return (Math.trunc(time*10) % 10) > 8
  }
  
  static pretty(code) {
    // const code = this.now()
    return [code.slice(0, 3), code.slice(3)].join(' ')
  }

  static generateSecret() {
    return b32.encode(crypto.randomBytes(10))
  }
  
}

module.exports = Flowtp