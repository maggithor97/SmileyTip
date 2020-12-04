var fs = require('fs');
var smileyCoin = require('../smiley/smilecoin-cli');
var help = require('./helpFunctions');

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
      console.log(result);
      /** Does he have the money */
      var payersBalance = help.getBalance(result);
      if (payersBalance < amount) {
        return 1;
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
            bot.notifySendTip(payerId, receverId, amount);
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

