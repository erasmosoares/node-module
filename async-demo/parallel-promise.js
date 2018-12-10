const p1 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Async 1...');
        resolve(1);
    },2000);
});

const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Async 2...');
        resolve(2);
    },3000);
});

const p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('Async 3...');
        resolve(3);
        //reject(new Error('Because ee failed'));
    },4000);
});

Promise.all([p1,p2,p3])
.then(result => console.log(result))
.catch(err => console.log('Error',err.message));