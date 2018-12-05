console.log('Before');
getUser(1, getRepositories);

function getRepositories(user){
    getRepositories(user.gitHubUsername,getCommits);
}
function getCommits(repos){
    getCommits(repos, displayCommits);
}
function displayCommits(commits){
    console.log(commits);
}
console.log('After');

function getUser(id, callback){
    setTimeout(()=>{
        console.log('Reading a user from a database...');
        callback({ id:id, gitHubUsername:'erasmo'});
    },2000);
}

function getRepositories(username,callback){
    setTimeout(()=>{
        console.log('Calling GithubApi...');
        callback(['repo1','repo2','repo3']);
    },2000);
}
/*console.log('Before');
getUser(1, (user) =>{
    console.log('User',user);
});
console.log(user);
console.log('After');

function getUser(id, callback){
    setTimeout(()=>{
        console.log('Reading a user from a database...');
        callback({ id:id, gitHubUsername:'erasmo'});
    },2000);
}*/
