
re('./helpFunctions');
var smileyCoin = require('../smiley/smilecoin-cli');

module.exports = {
	   Main function
	   balance: function (userId) {
	       var payerAddr = help.idToAddress(userId);
	           var unspentList = smileyCoin.getListUnspent(payerAddr);
	
	               unspentList.then(function (result) {
	                     var payersBalance = help.getBalance(JSON.parse(result));
	                           var bot = require('./bot.js');
	                                 bot.sendBalance(payersBalance);
	                                       return payersBalance;
	                                           });
	                                             }
	                                             };
