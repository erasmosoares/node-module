// Creating a module
const log = require('./logger');
console.log(log);
log('hey');

// Give path information
const path = require('path'); 
var pathObj = path.parse(__filename);
log(pathObj);

// OS Info
const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

//Template string ES6
log(`Total Memory: ${totalMemory}`);
log(`Free Memory: ${freeMemory}`);

// File System
const fs = require('fs');
const files = fs.readdirSync('./');
fs.readdir('./',function(err,files){
    if(err) log(`Error:${err}`);
    else log(`Result:${files}`);
});

log(files);

//Events
const EventEmitter = require('events');
const emitter = new EventEmitter();

//Register
emitter.on('messageLogged',function(){
    log('Listenner called');
});

emitter.emit('messageLogged');