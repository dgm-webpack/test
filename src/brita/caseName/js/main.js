import './../scss/all.scss';
//require("@demoImg/loading1.gif").default;

import '../../../../assets/GSAP/hv2/main.scss';
import actList from '../../../../assets/GSAP/hv2/main.js';


// 引用後，可修改參數：
//actList為hv2/main.js檔裡的資料，存放動態
//可用下面方式修改
console.log(actList) 
actList[1].tittle_xA = 150;
actList[1].tittle_yA = 0;




//document.querySelector('span').style.backgroundImage = 'url(../images/loading1.gif)' //用行用樣式，路徑會是以html為基點

// let newimg = document.createElement("img");

// document.querySelector("body").appendChild(newimg);

// document.querySelector('img').setAttribute("src","images/loading1.gif")

