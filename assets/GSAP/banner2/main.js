import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let sections = document.querySelectorAll(".panel");
sections.forEach(function (item, index) {
  gsap.to(item, {
    scrollTrigger: {
      trigger: item,
      // markers: true,
      pin: true,
      pinSpacing: false,
    }
  });
})


