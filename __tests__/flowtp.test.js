const Flowtp = require('../lib/index')
const b32 = require('thirty-two')

const secret = b32.encode('12345678901234567890')
const f = new Flowtp(secret)

test('correct TOTP code for secret and time', function() {
  expect(
    f.at(1111111109)
  ).toBe('081804')
})

test('verifies that a code is correct for a certain time', function() {
  expect(
    f.verifyAt('081804', 1111111109)
  ).toBeTruthy()
})