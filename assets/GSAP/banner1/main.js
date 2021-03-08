// import { gsap } from "gsap";
// export default gsap

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger);

// let sections = gsap.utils.toArray(".panel");
let sections = document.querySelectorAll(".panel");
// console.log(sections)

gsap.to(".container", {
  xPercent: -(5/6)*100,
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    markers: true,
    pin: true,
    end: 'bottom top',
    // pinReparent: true,
    // pinSpacing: false,
    scrub: 1,
    // snap: 1 / (sections.length - 1),
    // base vertical scrolling on how wide the container is so it feels more natural.
    // end: () => "+=" + document.querySelector(".container").offsetWidth,
    //onLeave:()=> console.log('leave')
    // onEnterBack:()=> console.log('onEnterBack'),
    // onLeave:()=> document.querySelector(".order").style.marginTop="-100vh", //margin
    // onEnterBack:()=> document.querySelector(".order").style.marginTop="-0vh" //margin
  }
});