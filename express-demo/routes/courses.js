const express = require('express');
const router = express.Router();

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
router.get('/',(req,res)=>{
    res.send(courses);
});

router.post('/',(req,res)=>{
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
router.get('/:id',(req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id was not found');
    res.send(course);
});

//http://localhost:3000/api/posts/2018/01
router.get('/:year/:month',(req,res) =>{
    res.send(req.params); //req.query
});

router.put('/:id',(req,res) =>{
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

router.delete('/:id',(req,res)=>{
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

module.exports = router;