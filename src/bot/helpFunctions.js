var fs = require('fs');
var smileyCoin = require('../smiley/smilecoin-cli');

/** DATABASE */
var data = fs.readFileSync('../myDB.json');
var users = JSON.parse(data);

module.exports = {
    idToAddress: function (userId) {
	var data1 = fs.readFileSync('../myDB.json');
	var users1 = JSON.parse(data1);
	var userIdString = userId.toString();
        var n = users1.Users.length;
        for (var i = 0; i < n; i++) {
            if (users1.Users[i].id == userIdString) {
                return users1.Users[i].publicAddress;
            }
        }
	return "nothing"
    },
    getBalance: function (unspentList) {
        var n = unspentList.length;
        var sum = 0;
        for (var i = 0; i < n; i++) {
            sum = sum + unspentList[i].amount;
        }
	console.log("help: " + unspentList[0].txid);
	console.log("help: " + typeof unspentList[0].amount);
	console.log("help: sum" + sum);
        return sum;
    },
    listunspent: function (addr) {
        return smileyCoin.getListUnspent(addr);
    },
    getWithdrawAddress: function(userId) {
        var n = users.Users.length;
        for (var i = 0; i < n; i++) {
            if (users.Users[i].id == userId) {
                return users.Users[i].withdrawAddress;
            }
        }
    },
    hasAddress: function(userId) {
        var n = users.Users.length;
        for (var i = 0; i < n; i++) {
            if (users.Users[i].id == userId) {
                return true;
            }
        }
        return false;
    }
}
