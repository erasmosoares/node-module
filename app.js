// Creating a module
const Logger = require('./logger');
const logger = new Logger();

// Register
logger.on('messageLogged',(arg)=>{
    console.log('Listenner called',arg);
});

// Give path information
const path = require('path'); 
var pathObj = path.parse(__filename);
logger.log(pathObj);

// OS Info
const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

// Template string ES6
logger.log(`Total Memory: ${totalMemory}`);
logger.log(`Free Memory: ${freeMemory}`);

// File System
const fs = require('fs');
const files = fs.readdirSync('./');
fs.readdir('./',function(err,files){
    if(err) logger.log(`Error:${err}`);
    else logger.log(`Result:${files}`);
});

logger.log(files);


