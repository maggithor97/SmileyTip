var help = require('./helpFunctions');

module.exports = {
  // Main function
  balance: function (userId) {
    var payerAddr = help.idToAddress(userId);
    var unspentList = help.listunspent(payerAddr);

    unspentList.then(function (result) {
      var payersBalance = help.getBalance(result);
      return payersBalance;
    });
  }
};