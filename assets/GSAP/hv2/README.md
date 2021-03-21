
#使用到的插件：GSAP
//need help learning GSAP? 
//check out my courses: https://www.creativeCodingClub.com

hv1
固定hv並使圖片往上捲，產生視差滾動的效果。


hv2
多個hv，當滾到時才會播放特效
actList物件為參考的動態，
在專案主檔引用後，可修改參數：
    import '../../../../assets/GSAP/hv2/main.scss';
    import actList from '../../../../assets/GSAP/hv2/main.js';
    //可用下面方式修改
    console.log(actList) 
    actList[1].tittle_xA = 150;
    actList[1].tittle_yA = 0;


h3
長條