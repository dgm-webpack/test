import { gsap } from "gsap";
export default gsap

document.querySelector('.box').style.border = '1px solid #000'
// document.querySelector('.box').style.color = "#cc00cc"

gsap.from(".box", {duration: 1, x: 1000});
