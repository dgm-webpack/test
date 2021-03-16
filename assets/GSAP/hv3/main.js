// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.set(".rowImg", {backgroundImage: `url(https://source.unsplash.com/random/${innerWidth * 3}x${innerHeight})`})
var t,value
gsap.to(".rowImg", {
  xPercent: -100, 
  x: innerWidth,
  ease: "none",
  scrollTrigger: {
    trigger: ".rowImg",
    end: () => innerWidth * 3,
    scrub: true,
    pin: true,
    anticipatePin: 1,
    onEnter: ()=> {
      actValue()
    },
    onEnterBack: ()=> {
      //console.log('onEnterBack')
      actValue()
    },
    onLeave: ()=> {
      //console.log('leave')
      window.clearTimeout(t); 
    },
    onLeaveBack: () => {
      //console.log("onLeaveBack")
      window.clearTimeout(t); 
    },
  }
});

function actValue(){
  t =setInterval(function () { 
    value = document.querySelector('progress').value
    //console.log(value)
    if(value > 51 && value < 54){
      document.querySelector('.act').classList.add("addACT")
    }else{
      document.querySelector('.act').classList.remove("addACT")
    }
  }, 500);
}



document.querySelector(".act").addEventListener('click',function(){
  // let value = document.querySelector('progress').value
  // alert(value)

})

gsap.to('progress', {
  value: 100,
  ease: 'none',
  scrollTrigger: { scrub: 0.3 }
});



