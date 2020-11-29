var fs = require('fs');
var smileyCoin = require('../smiley/smilecoin-cli');

/** DATABASE */
var data = fs.readFileSync('../myDB.json');
var users = JSON.parse(data);

module.exports = {
    idToAddress: function (userId) {
        var n = users.Users.length;
        for (var i = 0; i < n; i++) {
            if (users.Users[i].id == userId) {
                return users.Users[i].publicAddress;
            }
        }
    },
    getBalance: function (unspentList) {
        var n = unspentList.length;
        var sum = 0;
        for (var i = 0; i < n; i++) {
            sum = sum + unspentList[i].amound;
        }
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