import './style.css'
import gsap from 'gsap'

const intro = gsap.timeline()
    .from('.samsung', {x: -200, autoAlpha: 0, duration: 1})
    .to ('.samsung', {margin: 0, duration: 1})
    .from('.string1', {x: -600, autoAlpha: 0, duration: 0.7}, '>' )
    .from('.string2', {x: -600, autoAlpha: 0, duration: 0.7}, '-=0.3')
    .from('.string3', {x: -600, autoAlpha: 0, duration: 0.7}, '-=0.3')
    // add string from psd write to Olia
    .from('.slidingBG', {x: -1000, autoAlpha: 0, duration: 1}, '>+1' )
    .from(".mainBG", {scale: 1.1,y: -70,  duration: 1}, "<")


