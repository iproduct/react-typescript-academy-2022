const p1 = new Promise((resolve) => { setTimeout(resolve, 3000, 'one'); });

const p2 = new Promise((resolve) => { setTimeout(resolve, 2000, 'two'); });

const p3 = new Promise((res, reject) => { setTimeout(() => reject('rejected'), 1000, 'three'); });

Promise.race([p1, p2, p3]).then(v => console.log('Success:', v)).catch(err => console.log('Error:', err)).then(() => console.log('Demo finished'));


