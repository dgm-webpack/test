// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


gsap.to(".container_gsapParallax", {
  scrollTrigger: {
    trigger: ".container_gsapParallax",
    scrub: true,
    pin: true,
    //markers: true,
    start: "center 40%",
    end: "bottom -100%",
    toggleClass: "active",
    ease: "power2"
  }
});

gsap.to(".inner_img", {
  scrollTrigger: {
    trigger: ".container_gsapParallax",
    // markers: true,
    scrub: 1,
    start: "top bottom",
    end: "bottom -100%",
    ease: "power2"
  },
  y: "-30%"
});



