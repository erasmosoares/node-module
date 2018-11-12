// Give path information
const path = require('path'); 
var pathObj = path.parse(__filename);
console.log(pathObj);

// Creating a module
const log = require('./logger');
console.log(log);
log('hey');