var withdraw = require('./withdraw');
var register = require('./register');
var sendTip = require('./sendTip');
var balance = require('./balance');
var help = require('./helpFunctions');


/*** Connecting to the discord bot ******/
const Discord = require('discord.js');
const client = new Discord.Client();
client.login('Nzc3OTExNzMzODkzMDcwODY4.X7KUwg.MJ0zY2Cv_w97fA1-FEt0yO-benw');


client.on('ready', readyDiscord);
client.on('message', gotMessage);

function readyDiscord() {
    console.log('Velkominn boti!');
};



function gotMessage(msg) {
    if (msg.author.bot) return;

    messege = msg.content.split(" ");
    switch (messege[0]) {
        case "!help":
            var helpMessage = getHelp();
            msg.channel.send(helpMessage);
            break;
        case "!register":
            var returnAddress = messege[1];
            var userId = msg.author.id;
            // Calls register() in register.js
            register.register(userId, returnAddress);
            if (help.hasAddress(userId)) {
                msg.reply("You have already registered!\nUse the command '!myAddress' to view your address")
            } else {
                msg.reply("You have registered!\nUse the command '!myAddress' to view your new address")
            }
            break;
        case "!myAddress":
            var userId = msg.author.id;
            var userAddress = help.idToAddress(userId);
            if (userAddress = 0) {
                msg.reply("First you have to register.\nTry !help for info")
            } else {
                msg.reply("Address: " + userAddress);
            }
            break;
        case "!myWithdrawAddress":
            var userId = msg.author.id;
            var userAddress = help.idToWithdrawAddress(userId);
            if (userAddress = 0) {
                msg.reply("First you have to register.\nTry !help for info")
            } else {
                msg.reply("Your withdraw address: " + userAddress);
            }
            break;
        case "!changeWithdrawAddress":
            var userId = msg.author.id;
            var newAddress = messege[1];
            var good = help.changeWithdrawAddress(newAddress, userId);
            if (good) {
                msg.reply("Withdraw address changed!")
            } else {
                msg.reply("Something went wrong. Have you registered yet?\nTry !help for info")
            }
            break;
        case "!sendTip":
            var payerId = msg.author.id;
            //var receverId = msg.mentions.users.first().id;
            var receverId = 420;
            if (!help.hasAddress(payerId)) {
                msg.reply('First you have to register\nUse !help for info')
                return;
            }
            if (!help.hasAddress(receverId)) {
                msg.reply('This user does not have an account')
                return;
            }
            var amound = parseInt(messege[2]);
            if (!isNumber(amound)) {
                msg.reply('Command has to be of form:\n!sendTip @someone amound');
                return;
            }
            var result = sendTip.sendtip(payerId, receverId, amound);
            break;

        case "!balance":
            var userId = msg.author.id;
            balance.balance(userId);
            msg.reply("I sent you your balance in dm");
            break;
        case "!withdraw":
            var userId = msg.author.id;


            if (help.hasAddress(userId)) {
                withdraw.withdraw(userId);
                msg.reply("You have withdrawn. Check dm's for info");
            } else {
                msg.reply("First you have to register.\nUse !help for info")
            }

            break;
    }

}
function isNumber(value) {
    var result = typeof value === 'number' && isFinite(value);
    return result;
}

function getHelp() {
    return "This is a smileycoin tippingbot.\n    If you don't have a smileycoin address, you should first get you one. Info at https://smileyco.in \n    Commands\:\n    !help                               //Get this message\n    !register (your withdraw address)   //Register for an account\n    !myAddress                          //Gives you your address\n    !sendTip @discordUser (amount)      //Send users smileyCoins\n    !balance                            //Check your balance\n    !withdraw                           //Withdraw your funds to your withdraw address\n    !myWithdrawAddress                  //Gives you your withdraw address\n    !changeWithdrawAddress (new withdraw address)       //Change withdraw address\n"
}


module.exports = {
    notifyBalance: function (userBalance, userId) {
        client.users.cache.get(userId).send('Your balance: ' + userBalance);
    },
    notifySendTip: function (payerId, receverId, amount, txid) {
        var payer = client.users.cache.get(payerId).username;
        //var recever = client.users.cache.get(receverId).username;
        client.users.cache.get(payerId).send('You sent ' + ' ' + amount + "SMLY's\nTxid: " + txid);
        //client.users.cache.get(receverId).send(payer+ ' sent you ' + amount+"SMLY's\Txid: " +txid);
        console.log("txid: " + txid);
    },
    errorSendTip: function (errorNr, payerId) {
        if (errorNr = 1) {
            client.users.cache.get(payerId).send("not enough balance for that transaction");
        }
    },
    notifyWithdraw: function (txid, userId, amount) {
        client.users.cache.get(userId).send('You have withdrawn ' + amount + " SMLY's\nTxid: " + txid);
    },
    errorWithdraw: function (errorNr, userId) {
        if (errorNr = 1) {
            client.users.cache.get(userId).send("You have no SMLY's to withdraw");
        }
    }

};
