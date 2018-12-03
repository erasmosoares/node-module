const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config'); //config file
const helmet = require('helmet');
const morgan = require('morgan'); //Logging
//Pascal name for classes
const Joi = require('joi'); //error validator
const express = require('express');
const app = express();

app.set('view engine','pug');
app.set('views','./views');

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

const courses = [
    { id:1, name:'course 1'},
    { id:2, name:'course 2'},
    { id:3, name:'course 3'},
];
/*
app.get();
app.post();
app.put();
app.delete();
*/

app.get('/',(req,res)=>{
    //res.send('Hello World!');
    res.render('index',{ title: 'My Express App',message:'Hello'});
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.post('/api/courses',(req,res)=>{
    const { error } = validateCourse(req.body); //result.error -> obj destructure -> same as -> const result = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    /*
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send('Name is required and should be minimum 3 characters.');
        return;
    }
    */

    const course =  {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

//http://localhost:3000/api/courses/1
app.get('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id was not found');
    res.send(course);
});

//http://localhost:3000/api/posts/2018/01
app.get('/api/posts/:year/:month',(req,res) =>{
    res.send(req.params); //req.query
});

app.put('/api/courses/:id',(req,res) =>{
    //Look up the course
    //If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id was not found');


    //Validate
    //If invalid, return 400 - Bad request
    const { error } = validateCourse(req.body); //result.error -> obj destructure -> same as -> const result = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Update course
    course.name = req.body.name;

    //Return the updated course
    res.send(course);

});

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id was not found');

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${3000}...`);
});