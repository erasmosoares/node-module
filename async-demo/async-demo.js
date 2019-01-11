
function getUser(id, callback){
    setTimeout(()=>{
        console.log('Reading a user from a database...');
        callback({ id:id, gitHubUsername:'erasmo'});
    },2000);
}
console.log('Before');
const user = getUser(1);
console.log('After');