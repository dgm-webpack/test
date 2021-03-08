function cube(x) {
    return x * x * x;
}
require("../images/995158.jpg").default; 
// import "../images/995158.jpg";

document.querySelector('button').addEventListener('click', function (e) {
    //修改css圖片背景、html圖片

    // let dom = document.querySelector('img')
    let dom2 = document.querySelector('section')
    // let txt = dom.getAttribute("src")
    // dom.setAttribute('src', `../images/995158.jpg`)
    dom2.style.backgroundImage =  `url(../images/995158.jpg)`
    // http://127.0.0.1:5500/dist/images/995157.jpg
    // http:127.0.0.1/dist/images/995157.jpg
})

//匯出的內容，用物件的方式可匯出多個
module.exports = {
    cube: cube,
    text: 'hello'
}