const logoWord = document.querySelectorAll('.logo .word');
let splited;
const tl = gsap.timeline();


function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();    
}
locomotive();

function smoothScroll(){
    const scroll = new LocomotiveScroll({
        el: document.querySelector('main'),
        smooth: true
    });
}
smoothScroll();

function loadSite(){
    gsap.from('#parallax .cloud',{
        scale: 4,
        duration: 2.5,
    })
    gsap.from('#parallax .title',{
        y: 100,
        opacity: 0,
        scale: 0.8,
        duration: 2,
        delay: 1.5
    })
    gsap.from('#main-header .nav-icon', {
        y: -100,
        duration: 1,
        delay: 2.5
    })
}
loadSite();

function bgCursorAnime(){
    document.addEventListener('mousemove', (e)=>{
        gsap.to('#bg-cursor', {
            x: e.clientX - 145,
            y: e.clientY -110,
            duration: 1
        })
    })
}
bgCursorAnime();

function logoAnimation(){
    logoWord.forEach((elem)=>{
        splited = elem.textContent.split('');
        elem.textContent = '';
        splited.forEach((val)=>{
            if(val.includes('S') || val.includes('E')){
                elem.innerHTML += `<span>${val}</span>`
            }
            else{
                elem.innerHTML += `<span class="slide-logo">${val}</span>`
            }
        })
    })
    const slideLogo = document.querySelectorAll('.logo .slide-logo');
    gsap.from(slideLogo,{
        y: 80,
        duration: 0.6,
        stagger: 0.050,
    });
    gsap.to(slideLogo,{
        opacity: 0,
        width: 0,
        duration: 0.6,
        scrollTrigger:{
            trigger: slideLogo,
            scroller: 'main',
            scrub: 1,
            start: 'top: 5%',
            end: 'top: 10%',
        }
    });
}
logoAnimation();

function introAnime(){
    gsap.to('#intro-section .intro-video video', {
        width: '100%',
        height: '100%',
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger:{
            trigger: '#intro-section .intro-video video',
            scroller: 'main',
            start: 'top: 100%',
            end: 'top: 90%'
        }
    })
    gsap.from('#intro-section .heading-line span', {
        y: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
            scroller: 'main',
            trigger: '#intro-section .heading-line span',
            start: 'top: 100%',
            end: 'top: 90%'
        }
    })
    gsap.from('#intro-section .min-heading', {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            scroller: 'main',
            trigger: '#intro-section .heading-line span',
            start: 'top: 70%',
            end: 'top: 60%'
        }
    })
}
introAnime();

function magicSecAnime(){
    gsap.from('#magic .img-container', {
        width: '30%',
        height: '40%',
        duration: 1,
        ease: 'power4.inOut',
        scrollTrigger: {
            scroller: 'main',
            trigger: '#magic .img-container',
            start: 'top: 90%',
            end: 'top: 80%'
        }
    })
    Shery.imageEffect("#magic .img-container", {
        style: 5,
        gooey: true,
        config: {"a":{"value":0.23,"range":[0,30]},"b":{"value":-0.92,"range":[-1,1]},"zindex":{"value":"99","range":[-9999999,9999999]},"aspect":{"value":2.3414425473347467},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1.09,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":2.52,"range":[0,10]},"metaball":{"value":0.23,"range":[0,2]},"discard_threshold":{"value":0.68,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
    })
}
magicSecAnime();

function headlineAnime(){
    gsap.to('#headline .head-txt', {
        transform: 'translateX(-68.2%)',
        scrollTrigger: {
            trigger: '#headline',
            scroller: 'main',
            start: 'top: 0',
            end: 'top: -300%',
            scrub: 3,
            pin: true
        }
    })
}
headlineAnime();