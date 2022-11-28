//require
const os = require('os');
console.log(`Free memmory: ${os.freemem()}`);
console.log(`Free total memmory: ${os.totalmem()}`);
//sync
const fs = require('fs');
const files = fs.readdirSync('./')
console.log(`[sync] ${files}`);
//async
//console.log(module);

fs.readdir('./',(err, files) => {
    if (err){
    console.log(err);
    }
    else{
        console.log(`[sync] ${files}`);

    }
})
console.log ('------in between')





