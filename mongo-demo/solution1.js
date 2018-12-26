const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',{ useNewUrlParser: true });

const courseSchema = new mongoose.Schema({
  _id:String,
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
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

async function removeCourse(id){
  // const result = await Course.deleteOne({_id:id });
  const result = await Course.findOneAndDelete({_id:id });
  console.log(result);
}

//run();
removeCourse('5a68fdc3615eda645bc6bdec');


