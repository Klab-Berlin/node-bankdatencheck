var https = require('https');
var querystring = require('querystring');
var xml2js = require('xml2js');


/**
 *  The 'Bankdatencheck' class provides the functionality to interact with 'www.bankdatencheck.de'. It checks if a
 *  german bank account (bank account number and bank code) or a german IBAN is alogirthmic valid.
 *  @constructor
 *
 *  @param {String} productLogin Login name of the product, provided by 'www.bankdatencheck.de' with a paid account.
 *  @param {String} code Passphrase provided by 'www.bankdatencheck.de' with a paid account.
 */
var Bankdatencheck = function(productLogin, code) {
  this.requestParameter = {
    'sProductLogin': productLogin || null,
    'sCode': code || null,
    'sFormat': 'XML'
  }
  
  this.baseUrl = 'https://wr.ispsuite.portunity.de/webrequests/product-bankcheck/';
  this.xmlParser = new xml2js.Parser({
    explicitArray: false
  });
};


/**
 *  Check a german bank account with the given account number and bank code if it is algorithmic valid.
 *
 *  @param {String} accountNumber Bank account number.
 *  @param {String} bankCode Bank code.
 *  @param {Function} callback A callback function that is executed to return the result.
 */
Bankdatencheck.prototype.checkAccount = function(accountNumber, bankCode, callback) {
  if (typeof accountNumber === 'undefined') {
    throw '[Bankdatencheck] - no account number parameter given';
  }
  
  if (typeof bankCode === 'undefined') {
    throw '[Bankdatencheck] - no bank code parameter given';
  }
  
  this._request(
    this._url({sKonto: accountNumber, sBLZ: bankCode}),
    callback
  );
};


/**
 *  Check the given german IBAN if it is algorithmic valid.
 *
 *  @param {String} iban International bank account number.
 *  @param {Function} callback A callback function that is executed to return the result.
 */
Bankdatencheck.prototype.checkIban = function(iban, callback) {
  if (typeof iban === 'undefined') {
    throw '[Bankdatencheck] - no iban parameter given';
  }
  
  this._request(
    this._url({sIBAN: iban}),
    callback
  );
};


/**
 *  Generate a request URL with the given parameter.
 *
 *  @param {Object} paramter URL parameter.
 *  @returns {String} A request URL.
 */
Bankdatencheck.prototype._url = function(parameter) {
  for (var i in this.requestParameter) {
    if (this.requestParameter[i] !== null) {
      parameter[i] = this.requestParameter[i];
    }
  }
  return this.baseUrl + '?' + querystring.stringify(parameter);
};


/**
 *  Request (GET) the given URL. The XML response is converted to a js object.
 *
 *  @param {String} url The request URL.
 *  @param {Function} callback A callback function that is executed to return the result.
 */
Bankdatencheck.prototype._request = function(url, callback) {
  var self = this;
  var respData = [];
  
  https.get(url, function(res) {
    res.on('data', function(d) {
      respData.push(d);
    });
    
    res.on('end', function() {
      self.xmlParser.parseString(respData.join(''), function(err, result) {
        if (typeof result.Abfrage !== 'undefined' && typeof result.Abfrage.Ergebnis !== 'undefined') {
          callback(err, result.Abfrage.Ergebnis);
        } else {
          callback(err, result);
        }
      });
    });
  }).on('error', function(err) {
    callback(err, null);
  });
};


exports.Bankdatencheck = Bankdatencheck;
