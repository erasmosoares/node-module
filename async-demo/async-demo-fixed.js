// async operation
function getUser(id){
    setTimeout(()=>{
        console.log('Reading a user from a database...');
        return { id:id, gitHubUsername:'erasmo'};
    },2000);
}

// Callbacks
function getUser(id, callback){
    setTimeout(()=>{
        console.log('Reading a user from a database...');
        callback({ id:id, gitHubUsername:'erasmo'});
    },2000);
}

getUser(1, (user) =>{
    console.log('User',user);
});

// Promises
function getUser(id){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log('Reading a user from a database...');
            resolve({ id:id, gitHubUsername:'erasmo'});
        },2000);
})};

getUser(1)
.then(user => console.log('User',user.gitHubUsername))
.catch(err => console.log('Error',err.message));

// Async/await
async function displayUser(id){
    try{
        const user = await getUser(id);
        console.log(user);
    }
    catch(err){
        console.log('Error',err.message);
    }
}