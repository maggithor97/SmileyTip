var fs = require('fs');
var smileyCoin = require('../smiley/smilecoin-cli');
var help = require('./helpFunctions');
var bot = require('./bot');

/** DATABASE */
var data = fs.readFileSync('../myDB.json');
var users = JSON.parse(data);

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
        console.log("sendTip.js: CRT hex: " + hexResult);
        var signHex = smileyCoin.signRawTransaction(hexResult);
        signHex.then(function (signObjString) {

          var signObj = JSON.parse(signObjString);
          var signHex = signObj.hex;
          console.log("sendTip.js: SRT hex: " + signObj);
          var txid = smileyCoin.sendRawTransaction(signHex);
          txid.then(function (txid) {

            console.log("sendTip.js: send txid: " + txid);
            var bot = require('./bot');
            bot.notifySendTip(payerId, receverId, amount, txid);
            return;
          })
        })

      })
    });
    //return 0;



  }

};

/**
 * Takes smileycoin address(String)
 * Returns listunspent json object 
 */
async function listunspent(addr) {
  return await smileyCoin.getListUnspent(addr);
}

