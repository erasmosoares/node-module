//Relate documents Embedding

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err),);

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors:[authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

//addAuthor('5c389302f1a240a174518ad3',new Author({name:'Amy'}));

//createCourse('Node Course', [
//  new Author({ name: 'Mosh' }),
//  new Author({ name: 'John' })
//]);

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.save();
}

//removeAuthor('5c389302f1a240a174518ad3','5c38933f1ea82a93f008eb89');
