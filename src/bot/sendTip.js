var fs = require('fs');
var smileyCoin = require('../smiley/smilecoin-cli');
var help = require('./helpFunctions');

/** DATABASE */
var data = fs.readFileSync('../myDB.json');
var users = JSON.parse(data);

module.exports = {
  // Main function
  sendtip: function (payerId, receverId, amound) {
    var payerAddr = help.idToAddress(payerId);
    var receverAddr = help.idToAddress(receverId);

    
    var unspentList = listunspent(payerAddr);
    unspentList.then(function (result) {
      /** Does he have the money */
      var payersBalance = getBalance(result);
      if (payersBalance < amound) {
        return 1;
      }
      /** Create raw */
      var createHex = smileyCoin.createRawTransaction(result, amount, payerAddr, receverAddr);
      createHex.then(function (hexResult) {
        /** Sign and send */
        var signHex = smileyCoin.signRawTransaction(hexResult);
        signHex.then(function (signObj) {
          var signHex = signObj.hex;
          var txid = smileyCoin.sendRawTransaction(signHex);
          txid.then(function (txid) {
            return txid;
          })
        })

      })
    });
    return 0;



  }

};

/**
 * Takes smileycoin address(String)
 * Returns listunspent json object 
 */
async function listunspent(addr) {
  return await smileyCoin.getListUnspent(addr);
}

