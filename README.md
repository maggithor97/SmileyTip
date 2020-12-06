# Bot for Discord to send and receive smileyCoins!

## Create a Bot

1) Create a bot and get the bots Token and Client ID: https://discordapp.com/developers/applications/me

    1) After going to the link above click “new application”. Give it a name, picture, and description.

    2) On the side bar navigation menu click "Bot" Click “Add Bot” and click “Yes, Do It!” when the dialog pops up.

    3) Copy down the token used on this page to login and Client ID on the general info page to invite your new bot to your discord server.

2) invite the bot to your server using the link below and entering the Client ID or generate your own [Here:link:](https://discordapi.com/permissions.html)

```
https://discordapp.com/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=27648
```

## To run
* Clone this repo
* Make sure you have Node js version v10 or newer
* npm init
* npm install discord.js
* Let me know if I forgot something (email mtv3@hi.is)
 ##### In src/bot/bot.js:
Put your bot token in line
```
client.login('Your bot token here');
```
Then run the bot using "node bot.js"

## Commands
 In the discord server, you have a few commands for the bot:
* !help
     * Gives you a help message with all the commands.
* !register (your withdraw address) 
    * Register to the bot's DB with your withdraw address (your personal address) 
* !myAddress 
     * Shows your discord smileycoin address
* !sendTip @someone (amount) 
     * Send someone in the server x amount of SMLY
* !withdraw
     * Withdraw all your SMLY's from your discord SMLY address to your withdraw address
* !balance
     * Shows your balance
## How to use
1. First register with command `!register BFCuv5jcuXgBgUE2ETGMefJuNkTYg3nvCU` where `BFCuv5jcuXgBgUE2ETGMefJuNkTYg3nvCU` is my personal address.
2. Use command `!myAddress` to veiw your new address.
3. Send some SMLY's to the address the bot gave you. Then you can use that money to tip everyone who has an address in that server.