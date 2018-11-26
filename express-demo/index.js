const express = require('express');
const app = express();

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
    res.send('Hello World!');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

//http://localhost:3000/api/courses/1
app.get('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if(!course) res.status(404).send('The course with the given id was not found');
    res.send(course);
});

//http://localhost:3000/api/posts/2018/01
app.get('/api/posts/:year/:month',(req,res) =>{
    res.send(req.params); //req.query
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${3000}...`);
});