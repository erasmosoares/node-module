const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config'); //config file
const helmet = require('helmet');
const morgan = require('morgan'); //Logging
const course = require('./routes/courses');
const genre = require('./routes/genres')
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine','pug'); 
app.set('views','./views');

app.use('/api/courses',course);
app.use('/api/genres',genre);
app.use('/',home);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app:${app.get('env')}`);
 
app.use(express.json());
app.use(helmet());

// set password=123
console.log(`Application Name: ${config.get('name')} `);
console.log(`Mail Server: ${config.get('mail.host')} `);
//console.log(`Mail Password: ${config.get('mail.app_password')} `);

// $set NODE_ENV=production
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

dbDebugger('Database debugger...');

// PORT
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${3000}...`);
});