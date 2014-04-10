var Bankdatencheck = require('../lib/bankdatencheck').Bankdatencheck;


var bankdatencheck = new Bankdatencheck();
bankdatencheck.checkAccount('7876543100', '33080030', function(err, result) {
  if (err !== null) {
    console.error(err, result);
  } else {
    console.log(result);
  }
});
