import '../scss/main.scss';
import obj from './b.js';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";
//heool
console.log(obj.cube(5))
console.log(obj.text)
// 

gsap.from("h1",{x:500,opacity:1,scale:0}, { x: 1000, opacity: 0, scale: 0.5});