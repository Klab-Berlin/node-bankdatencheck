node-bankdatencheck
===================

A node library for interacting with 'www.bankdatencheck.de'.

## Installation
```
npm install bankdatencheck
```

## Usage
```js
var Bankdatencheck = require('../lib/bankdatencheck').Bankdatencheck;

var bankdatencheck = new Bankdatencheck();
bankdatencheck.checkAccount('7876543100', '33080030', function(err, result) {
  if (err !== null) {
    console.error(err, result);
  } else {
    console.log(result);
  }
});
```
