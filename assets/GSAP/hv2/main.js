// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
  
  gsap.utils.toArray(".container_gsapCard .inner").forEach(function(elem) {
    
    ScrollTrigger.create({
      trigger: elem,
      markers: true,
      start: "center bottom",
      end: "bottom top",
      toggleClass: "active",
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem) },
    });
  });
});


function animateFrom(elem) {
  let act;
  switch(elem.classList[1]){
    case 'inner_center' :{
      act = actList[0]
      break;
    }
    case 'inner_right' :{
      act = actList[1]
      break;
    }
    case 'inner_left' :{
      act = actList[2]
      break;
    }
    case 'inner_between' :{
      act = actList[3]
      break;
    }
  }

  let childNodes = elem.children[1].children[0]
  // console.log(childNodes = elem.children[1].children[0].children)
      gsap.fromTo(childNodes.children[0], {xPercent: act.tittle_xA, yPercent: act.tittle_yA, opacity: 0,scale: act.tittle_scaleA}, {
        duration: 1.25, 
        xPercent: act.tittle_xB,
        yPercent: act.tittle_yB, 
        scale: act.tittle_scaleB,
        opacity: 1, 
        ease: "expo", 
        overwrite: "auto"
      });
      gsap.fromTo(childNodes.children[2], {xPercent: act.mainTxt_xA, yPercent: act.mainTxt_yA, opacity: 0,scale: act.mainTxt_scaleA}, {
        duration: 1.25, 
        xPercent: act.mainTxt_xB,
        yPercent: act.mainTxt_yB, 
        scale: act.mainTxt_scaleB,
        opacity: 1, 
        ease: "expo", 
        overwrite: "auto"
      });
}

//依排版指定動態
var actList = [
  {//inner_center  A->B
    tittle_xA : 0,
    tittle_xB : 0,
    tittle_yA : -150,
    tittle_yB : 0,
    tittle_scaleA: 0,
    tittle_scaleB: 1,
    mainTxt_xA : 0,
    mainTxt_xB : 0,
    mainTxt_yA : 150,
    mainTxt_yB : 0,
    mainTxt_scaleA: 1,
    mainTxt_scaleB: 1,
  },
  {//inner_right  A->B
    tittle_xA : 0,
    tittle_xB : 0,
    tittle_yA : -150,
    tittle_yB : 0,
    tittle_scaleA: 1,
    tittle_scaleB: 1,
    mainTxt_xA : 0,
    mainTxt_xB : 0,
    mainTxt_yA : 0,
    mainTxt_yB : 0,
    mainTxt_scaleA: 2,
    mainTxt_scaleB: 1,
  },
  {//inner_left  A->B
    tittle_xA : -150,
    tittle_xB : 0,
    tittle_yA : 0,
    tittle_yB : 0,
    tittle_scaleA: 1,
    tittle_scaleB: 1,
    mainTxt_xA : 0,
    mainTxt_xB : 0,
    mainTxt_yA : 0,
    mainTxt_yB : 0,
    mainTxt_scaleA: 0,
    mainTxt_scaleB: 1,
  },
  {//inner_between  A->B
    tittle_xA : -150,
    tittle_xB : 0,
    tittle_yA : 0,
    tittle_yB : 0,
    tittle_scaleA: 1,
    tittle_scaleB: 1,
    mainTxt_xA : 150,
    mainTxt_xB : 0,
    mainTxt_yA : 0,
    mainTxt_yB : 0,
    mainTxt_scaleA: 1,
    mainTxt_scaleB: 1,
  }
]
export default actList