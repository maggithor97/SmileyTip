module.exports = {
  // Main function
  balance: function (userId) {
    var payerAddr = idToAddress(userId);
    var unspentList = listunspent(payerAddr);

    unspentList.then(function (result) {
      var payersBalance = getBalance(result);
      return payersBalance;
    });

  }
};

/**
* Takes JSON of unspent transactions
* Returns the sum of all the unspent amounts
*/
function getBalance(unspentList) {
  var n = unspentList.length;
  var sum = 0;
  for (var i = 0; i < n; i++) {
    sum = sum + unspentList[i].amound;
  }
  return sum;
}
/**
 * Takes smileycoin address(String)
 * Returns listunspent json object 
 */
async function listunspent(addr) {
  return await smileyCoin.getListUnspent(addr);
}

function idToAddress(userId) {
  var n = users.Users.length;
  for (var i = 0; i < n; i++) {
    if (users.Users[i].id == userId) {
      return users.Users[i].publicAddress;
    }
  }
}