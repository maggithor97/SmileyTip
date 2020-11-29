function execShellCommand(cmd) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}
async function f() {
    const javaInfo = await execShellCommand('smileycoin-cli help');
    return javaInfo;
}
var bla = f();
bla.then(function (result) {
    console.log(result); // Prentar þegar ready
});
console.log(bla) // Promise pending