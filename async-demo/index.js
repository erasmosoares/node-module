//getUser(1, getRepositories);

function getRepositories(user){
    getRepositories(user.gitHubUsername,getCommits);
}
function getCommits(repos){
    getCommits(repos, displayCommits);
}
function displayCommits(commits){
    console.log(commits);
}

function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Reading a user from a database...');
            resolve({ id:id, gitHubUsername:'erasmo'});
        },2000);
    });
}

getUser(1)
.then(user => getRepositories(user.gitHubUsername))
.catch(err => console.log('Error',err.message));

function getRepositories(username){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Calling GithubApi...');
            resolve(['repo1','repo2','repo3']);
        },2000);
    });
}
