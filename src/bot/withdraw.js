var help = require('./helpFunctions');
var smileyCoin = require('../smiley/smilecoin-cli');


module.exports = {
	// Main function
	withdraw: function (userId) {

		var withdrawAddr = help.getWithdrawAddress(userId);
		var userAddr = help.idToAddress(userId);
		var unspent = help.listunspent(userAddr)

		unspent.then(function (result) {
			var balance = help.getBalance(JSON.parse(result));
			if (balance < 1) {
				var bot = require('./bot');
				bot.errorWithdraw(1, userId);
			}
			/** Create raw */
			var createHex = smileyCoin.createRawTransaction(result, balance - 1, userAddr, withdrawAddr);
			createHex.then(function (hexResult) {
				/** Sign and send */
				var signHex = smileyCoin.signRawTransaction(hexResult);
				signHex.then(function (signObj) {
					var sign = JSON.parse(signObj);
					var signHex = sign.hex;
					var txid = smileyCoin.sendRawTransaction(signHex);
					txid.then(function (txid) {
						var bot = require('./bot');
						bot.notifyWithdraw(txid, userId, balance);
						return;
					})
				})

			})
		});

	}
};
