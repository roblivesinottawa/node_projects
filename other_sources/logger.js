
// console.log(__filename)
// console.log(__dirname)


let url = 'http://logger.com';

function log(message){
    // send an http request
    console.log(message)
}


// module.exports.log = log;  //useful if we have multiple module
module.exports = log; //used when we have only one module
