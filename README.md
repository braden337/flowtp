# Flowtp

[![Build Status](https://travis-ci.org/braden337/flowtp.svg?branch=master)](https://travis-ci.org/braden337/flowtp)

This is a JavaScript class and a command line tool that helps you process and
manage Time-Base One Time Passwords (TOTP) that are used for a second factor of
authentication in some applications.

Implementing this has helped me better understand bit manipilation.

## Implementation

- follows [RFC6238](https://tools.ietf.org/html/rfc6238)
- uses a Unix time step of 30 seconds
- uses SHA1 in the process of calculating the TOTP

## Library

```javascript
const Flowtp = require('flowtp')

// at this moment, Unix time is 1513304902 so
let now = 1513304902

// create an instance of Flotp
// passing it a base32 encoded secret
let linda = new Flowtp('HELLOWORLD234567')

// if you don't pass it a secret,
// the constructor will generate a
// secret for you and set it as an
// instance variable
let paul = new Flowtp()

paul.secret // 'L6QVQRCVFXXP2T2G'
paul.now()  // '665713'

linda.now()       // '999328'
linda.at(now+30)  // '184569'

linda.verify('999328')           // true
linda.verifyAt('184569', now+30) // true

linda.toString() // '999 328'
```

## Command Line

```shell
# Unix time is still 1513304902

flowtp add github 'HELLOWORLD234567'
# output => github was added to the JSON file

flowtp github
# output => 999 328

flowtp remove github
# output => github was removed from the JSON file 
```