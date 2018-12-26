const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',{ useNewUrlParser: true });

const courseSchema = new mongoose.Schema({
  _id:String,
  name: {
    type: String, 
    required: true,
    minlength:5,
    maxlength:255
  },
  category:{
    type:String,
    enum:['web','mobile','network']
  },
  author: String, 
  tags: {
    type: Array,
    validate: function(v){
      return v &&  v.length > 0;
    },
    message: 'A course should have at least one tag.'
  },
  date: Date, 
  isPublished: Boolean,
  price:{
    type: Number,
    required: function(){
      return this.isPublished;
    }}
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
  .find({ isPublished: true, tags: 'backend' })
  .sort({ name: 1 })
  .select({ name: 1, author: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

async function updateCourse(id){
  // Approach update first
  const result = await Course.updateOne(
    {_id:id },
    { $set:{ isPublished: false, author: 'Erasmo'}
  });
  console.log(result);
}

async function deleteCourse(id){
  // const result = await Course.deleteOne({_id:id });
  const result = await Course.findOneAndDelete({_id:id });
  console.log(result);
}

async function createCourse(){

  const course = new Course({
      name:'Angular Course',
      author:'Esaj',
      tags:['angular 2','bootstrap'],
      isPublished:true,
      category: 'web',
      price: 15
  });
  
  try {
    const result = await course.save();
    console.log(result);  
  } catch (error) {
    console.log(error.message)
  }
}

createCourse();
//run();
//deleteCourse('5a68fdc3615eda645bc6bdec');


