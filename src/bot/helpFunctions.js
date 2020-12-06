var fs = require('fs');
var smileyCoin = require('../smiley/smilecoin-cli');

module.exports = {
    idToAddress: function (userId) {
        var data = fs.readFileSync('../myDB.json');
        var users = JSON.parse(data);
        var userIdString = userId.toString();
        var n = users.Users.length;
        for (var i = 0; i < n; i++) {
            if (users.Users[i].id == userIdString) {
                return users.Users[i].publicAddress;
            }
        }
        return 0
    },
    getBalance: function (unspentList) {
        var n = unspentList.length;
        var sum = 0;
        for (var i = 0; i < n; i++) {
            sum = sum + unspentList[i].amount;
        }
        return sum;
    },
    listunspent: function (addr) {
        return smileyCoin.getListUnspent(addr);
    },
    getWithdrawAddress: function (userId) {
        var data = fs.readFileSync('../myDB.json');
        var users = JSON.parse(data);
        var n = users.Users.length;
        for (var i = 0; i < n; i++) {
            if (users.Users[i].id == userId) {
                return users.Users[i].withdrawAddress;
            }
        }
    },
    hasAddress: function (userId) {
        var data = fs.readFileSync('../myDB.json');
        var users = JSON.parse(data);
        var n = users.Users.length;
        for (var i = 0; i < n; i++) {
            if (users.Users[i].id == userId) {
                return true;
            }
        }
        return false;
    },
    idToWithdrawAddress: function (userId) {
        var data = fs.readFileSync('../myDB.json');
        var users = JSON.parse(data);
        var userIdString = userId.toString();
        var n = users.Users.length;
        for (var i = 0; i < n; i++) {
            if (users.Users[i].id == userIdString) {
                return users.Users[i].withdrawAddress;
            }
        }
        return 0
    },
    changeWithdrawAddress: function (newAddress, userId) {
        var data = fs.readFileSync('../myDB.json');
        var users = JSON.parse(data);
        var userIdString = userId.toString();
        var n = users.Users.length;
        for (var i = 0; i < n; i++) {
            if (users.Users[i].id == userIdString) {
                users.Users[i].withdrawAddress = newAddress;
                return true;
            }
        }
        return false;
    }

}
