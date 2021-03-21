// function promise() {
//     return new Promise((resolve, reject) => {
//         // 隨機取得 0 or 1
//         const num = Math.random() > 0.5 ? 1 : 0;

//         // 1 則執行 resolve，否則執行 reject
//         if (num) {
//             resolve('成功');
//         }
//         reject('失敗')
//     });
// }

// promise()
//     .then((success) => {
//         console.log(success);
//     }, (fail) => {
//         console.log(fail);
//     })

//////  

// function promise(num) {
//     //console.log(num)
//     return new Promise((resolve, reject) => {
//         num ? resolve(`${num}, 成功`) : reject('失敗');
//     });
// }

// promise(1)
//     .then(success => {
//         console.log(success);
//         //執行

//         return promise(2);
//     })
//     .then(success => {
//         console.log(success);
//         setTimeout(() => {
//             console.log('非同步事件');
//         }, 5000)
//         return promise(3); // 這個階段會進入 catch，因為0相當於false所以會執行失敗
//     })
//     .then(success => {   // 由於上一個階段結果是 reject，所以此段不執行
//         console.log(success);
//         return promise(4);
//     })
//     .catch(fail => {
//         console.log(fail);
//     })

////////////////


// console.log('開始');

// axios.get('https://unpkg.com/swiper/swiper-bundle.min.js').then(function (response) {
//     data = response;
// });

// console.log(data);
let data = {}
//GET
axios.get('https://unpkg.com/swiper/swiper-bundle.min.js')
.then(res =>{
    data = res
    console.log("1:" , res);
}).then( function(){
    console.log("2:" ,data);
}).catch(err => {
    console.log(err);
})
//POST
// axios.post('http://api/user', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
// })
// .then(res => {
//     console.log(response);
// })
// .catch(err => {
//     console.log(error);
// });