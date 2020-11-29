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

        exec("smileycoin-cli dumpprivkey " + publicAddr, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            return stdout;
        });
        return;
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

    createRawTransaction: function (unspentList, amount, payerAddr, receverAddr) {
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
        var myOutputs;
        // Send max 15 smly to miner
        if (smileySum - amount > 10) {
            var moneyBack = smileySum - amount - 10;
            myOutputs = {
                receverAddr: amount,
                payerAddr: moneyBack
            };
        } else {
            myOutputs = {
                receverAddr: amount
            };
        }
        // Test
        var createCommand = "smileycoin-cli createrawtransaction " + myInputs + myOutputs;
        console.log(create);
        //

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