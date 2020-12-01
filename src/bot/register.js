var fs = require('fs');
var smileyCoin = require('../smiley/smilecoin-cli');

module.exports = {
    // Main function
    register: async function (userId, returnAddress) {

        /** DATABASE **/
        var data = fs.readFileSync('../myDB.json');
        var users = JSON.parse(data);
        var n = users.Users.length;
        var i;
        // If already registerd, return publicAddress
        for (i = 0; i < n; i++) {
            if (users.Users[i].id == userId) {
                return users.Users[i].publicAddress;
            }
        }
        var newAddr = smileyCoin.getNewAddress();

        newAddr.then(function (newAddress) {
            var newPrivKey = smileyCoin.getPrivKey(newAddress);

            newPrivKey.then(function (newPriv) {
                idString = userId.toString();
                var newData =
                {
                    "id": idString,
                    "publicAddress": newAddress,
                    "withdrawAddress": returnAddress,
                    "privateKey": newPriv
                }
                users.Users.push(newData);
                fs.writeFile('../myDB.json', JSON.stringify(users, null, 2), finished)
                console.log("register.js: new Address: "+ newAddress + "\nregister.js: typeof: " + typeof newAddress);
            	return newAddress;
            })
        	//Spilast á undan
	})


    }
};

function finished(err) {
    console.log('all set')
}
