//testing resolve
const p1 = Promise.resolve({id:1});
p1.then(result => console.log(result));

//testing rejection
const p2 = Promise.reject(new Error('reason for rejection'));
p2.catch(error => console.log(error));
