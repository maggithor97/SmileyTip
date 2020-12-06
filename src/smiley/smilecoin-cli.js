const { exec } = require("child_process");



module.exports = {
    getNewAddress: function () {
        return new Promise((resolve, reject) => {
            exec("smileycoin-cli getnewaddress", (error, stdout, stderr) => {
                if (error) {
                    console.warn(error);
                }
                resolve(stdout ? stdout : stderr);
            });
        });
    },

    getPrivKey: function (publicAddr) {
        return new Promise((resolve, reject) => {
            exec("smileycoin-cli dumpprivkey " + publicAddr, (error, stdout, stderr) => {
                if (error) {
                    console.warn(error);
                }
                resolve(stdout ? stdout : stderr);
            });
        });
    },

    getListUnspent: function (address) {
        return new Promise((resolve, reject) => {
            exec("smileycoin-cli listunspent 1 9999 '[\"" + address + "\"]'", (error, stdout, stderr) => {
                if (error) {
                    console.warn(error);
                }
                resolve(stdout ? stdout : stderr);
            });
        });
    },

    createRawTransaction: function (unspent, amount, payerAddr, receverAddr) {
        let unspentList = JSON.parse(unspent)
        var myInputs = [];
        var smileySum = 0;
        var i = 0;
        while (amount + 1 > smileySum) {
            smileySum = smileySum + unspentList[i].amount;
            var obj = {
                "txid": unspentList[i].txid,
                "vout": unspentList[i].vout
            }
            myInputs.push(obj);
            i++;
        }
        var myOutputs = {};
        // Send max 15 smly to miner
        if (smileySum - amount > 10) {
            var moneyBack = smileySum - amount - 10;
            myOutputs[receverAddr] = amount;
            myOutputs[payerAddr] = moneyBack;
        } else {
            myOutputs[receverAddr] = amount;
        }

        var createCommand = "smileycoin-cli createrawtransaction " + "'" + JSON.stringify(myInputs) + "' " + "'" + JSON.stringify(myOutputs) + "'";
        console.log("createRaw command: \n" + createCommand);

        return new Promise((resolve, reject) => {
            exec(createCommand, (error, stdout, stderr) => {
                if (error) {
                    console.warn(error);
                }
                resolve(stdout ? stdout : stderr);
            });
        });
    },
    signRawTransaction: function (hex) {
        return new Promise((resolve, reject) => {
            exec("smileycoin-cli signrawtransaction " + hex, (error, stdout, stderr) => {
                if (error) {
                    console.warn(error);
                }
                resolve(stdout ? stdout : stderr);
            });
        });
    },
    sendRawTransaction: function (hex) {
        return new Promise((resolve, reject) => {
            exec("smileycoin-cli sendrawtransaction " + hex, (error, stdout, stderr) => {
                if (error) {
                    console.warn(error);
                }
                resolve(stdout ? stdout : stderr);
            });
        });
    }

};
