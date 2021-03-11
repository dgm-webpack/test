import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let sections = document.querySelectorAll(".panel");

gsap.to(".panel", {
  xPercent:  -( sections.length - 1) * 100,
  ease: "none",
  scrollTrigger: {
    trigger: ".container_gsapRow",
    //markers: true,
    pin: true,
    scrub: 1,
  }
});

