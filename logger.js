////  Logger Module  //// 

const EventEmitter = require('events');
//var url = 'https://mylogger.io/log';

class Logger extends EventEmitter{
    
    log(message){
        //Send Http request
        console.log(message);
    
        this.emit('messageLogged',{id:1,url:'http://'});
    }
}


module.exports = Logger;
//module.exports.log = log;
//module.exports.endPoint = url;