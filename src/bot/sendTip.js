var fs = require('fs');
var smileyCoin = require('../smiley/smilecoin-cli');
var help = require('./helpFunctions');

module.exports = {
  // Main function
  sendtip: function (payerId, receverId, amount) {
    var payerAddr = help.idToAddress(payerId);
    var receverAddr = help.idToAddress(receverId);


    var unspentList = listunspent(payerAddr);
    unspentList.then(function (result) {
      /** Does he have the money */
      var payersBalance = help.getBalance(JSON.parse(result));
      if (payersBalance < amount) {
        var bot = require('./bot');
        bot.errorSendTip(1, payerId);
      }
      /** Create raw */
      var createHex = smileyCoin.createRawTransaction(result, amount, payerAddr, receverAddr);
      createHex.then(function (hexResult) {
        /** Sign and send */
        var signHex = smileyCoin.signRawTransaction(hexResult);
        signHex.then(function (signObjString) {

          var signObj = JSON.parse(signObjString);
          var signHex = signObj.hex;
          var txid = smileyCoin.sendRawTransaction(signHex);
          txid.then(function (txid) {
            var bot = require('./bot');
            bot.notifySendTip(payerId, receverId, amount, txid);
            return;
          })
        })

      })
    });
  }

};

/**
 * Takes smileycoin address(String)
 * Returns listunspent json object 
 */
async function listunspent(addr) {
  return await smileyCoin.getListUnspent(addr);
}

