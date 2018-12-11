const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true })
.then(()=>console.log('Connected to MongoDb...'))
.catch(err => console.error('Could not connect to MongoDb..',err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags:[String],
    date: {type:Date,default:Date.now},
    isPublished:Boolean
});

const Course = mongoose.model('Course',courseSchema);

async function createCourse(){

    const course = new Course({
        name:'Angular Course',
        author:'Esaj',
        tags:['angular','frontend'],
        isPublished:true
    });
    
    const result = await course.save();
    console.log(result);
}

//eq (equal)
//ne (not equal)
//gt (greater than)
//gte (greater than or equal to)
//lt (less than)
//lte (less than or equal to)
//in
//nin (not in)

async function getCourses(){
//    const courses = await Course.find();
    const courses = await Course
    //.find({author:'Esaj', isPublished:true})
    //.find({price: 10})
    //.find({price: {$gt:10, $lte: 20}})
    .find({price: {$in:[10,15,30]}})
    .limit(10)
    .sort({name:1}) //1=ascending -1=descending
    .select({name:1,tags:1});
    
    console.log(courses);
}

getCourses();
