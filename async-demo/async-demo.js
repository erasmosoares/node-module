// Callbacks
// Promises
// Async/await

function getUser(id){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log('Reading a user from a database...');
            resolve({ id:id, gitHubUsername:'erasmo'});
        },2000);
})};

async function displayUser(id){
    try{
        
        await getUser(id);
        console.log('After');
    }
    catch(err){
        console.log('Error',err.message);
    }
}


console.log('Before');
displayUser(1);


