var help = require('./helpFunctions');
var smileyCoin = require('../smiley/smilecoin-cli');

module.exports = {
  // Main function
  balance: function (userId) {
    var payerAddr = help.idToAddress(userId);
    var unspentList = smileyCoin.getListUnspent(payerAddr);

    unspentList.then(function (result) {
      var payersBalance = help.getBalance(result);
      return payersBalance;
    });
  }
};
