
let menuOpened = false;
let isMobile = false;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    isMobile = true;
}

document.addEventListener('DOMContentLoaded', () => {
    function animateSvg (id, delay, delayIncrement){
        const logo = document.getElementById(id);
        const logoPaths = document.querySelectorAll(`#${id} path`);
        delay = delay;
        for(let i = 0; i < logoPaths.length;i++){
            logoPaths[i].style.strokeDasharray  = logoPaths[i].getTotalLength();
            logoPaths[i].style.strokeDashoffset = logoPaths[i].getTotalLength();
            logoPaths[i].style.animation = `line-anim 2s ease forwards ${delay}s`;
            delay+=delayIncrement;
        }
        logo.style.animation = `fill 0.5s ease forwards ${delay}s`;
    }
// Set the id of SVG, delay time in seconds to start animation and delay between each animation
    animateSvg('main-title', 0, 0.1) 
}, false);

document.getElementById('menu-icon-div').addEventListener('click', (e) => {
    let target = document.getElementById('menu-icon-div')
    let cssDark = getComputedStyle(document.documentElement).getPropertyValue('--dark');
    target.classList.toggle('menu-icon-div')
    target.classList.toggle('close-icon-div')
    
    target.querySelector('.icon').classList.toggle('close')
    target.querySelector('.icon').classList.toggle('menu')

    let menuOpened = document.getElementById('menu-page').style.opacity == '1'
    let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if(menuOpened){
        document.getElementById('menu-page').style.height = 0
        document.getElementById('menu-page').style.opacity = 0
        document.querySelector('body').style.overflowY = 'scroll'
        document.getElementById('menu-page').style.bottom = window.innerHeight
        document.documentElement.style.setProperty('--marginLeft-slide', '-200px');
        document.documentElement.style.setProperty('--marginTop-slide', '-50px');

        document.getElementById('header-container').style.backgroundColor = 'white';
        document.getElementById('header-name').style.color = cssDark;
        document.getElementById("logo-letter").style.fill = cssDark;
        document.getElementById("logo-circle").style.stroke = cssDark;

        menuOpened = false;
    }else{
        document.getElementById('menu-page').style.height = '100vh'
        document.getElementById('menu-page').style.opacity = 1
        document.querySelector('body').style.overflowY = 'hidden'
        document.getElementById('menu-page').style.top = scrollTop + 'px'
        document.documentElement.style.setProperty('--marginLeft-slide', '0');
        document.documentElement.style.setProperty('--marginTop-slide', '0');

        document.getElementById('header-container').style.backgroundColor = cssDark;
        document.getElementById('header-name').style.color = 'white'
        document.getElementById("logo-letter").style.fill = 'white';
        document.getElementById("logo-circle").style.stroke = 'white';


        menuOpened = true;
    }
})

function vh(v) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}

Array.from(document.getElementsByClassName('nav-list-item')).forEach(function(elem) {
    elem.addEventListener('click', (e) => {
        test = e
        if(document.getElementsByClassName('selected-item').length){
            document.getElementsByClassName('selected-item')[0].classList.remove('selected-item')
        }
        
        e.target.classList.add('selected-item')
        document.getElementById('menu-icon-div').click()

        let href = e.target.getAttribute('data-value')
        let extraOffset = href == "#about-section" ? 0 : 20
        let offsetTop = document.querySelector(href).offsetTop - vh(extraOffset);
        scroll({
            top: offsetTop,
            behavior: "smooth"
          });
    });
  });



function initializeTag(){
    try {
        TagCanvas.Start('tagCanvas','tags',{
            textColour: 'white',
            reverse: true,
            depth: 0.7,
            maxSpeed: 0.08,
            textHeight: 16,
            outlineMethod: 'none',
            radiusX: 0.8,
            radiusY: 0.8,
            radiusZ: 0.8,
            wheelZoom: false,
            activeCursor: "normal",
            minBårightness: 0.05,
            shadowBlur: 4,
            shadowOffset: [2,2],
            textFont: "Poppins",
            initial: [0.1,-0.1]

        });
    } catch(e) {
    // something went wrong, hide the canvas container
    document.getElementById('tagsContainer').style.display = 'none';
    }
}

let tags = ["HTML", "CSS", "Git", "jQuery", "ReactJS", "Three.js", "Node", "React Native", "Bootstrap", "ES5/ES6", "Figma", "OutSystems", "ACCA", "SVG"]
window.onload = function() {

    let htmlString= ""
    for(let i =0;i<tags.length;i++){
        htmlString += `<li><a href='javascript: function(){return false;}'>${tags[i]}</a></li>`
    }
    document.getElementById('tags-list').innerHTML = htmlString
    initializeTag()
    updateGradient()

    document.getElementById('project-button').addEventListener('click', () => {
        let offsetTop = document.querySelector("#projects-section").offsetTop - vh(15)
        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    })

    document.getElementById('socialape-link').addEventListener('click',() => {
        window.open('https://socialape-2e522.firebaseapp.com/login')
    })
    document.getElementById('scrabble-link').addEventListener('click',() => {
        window.open('https://play.google.com/store/apps/details?id=com.coffeecoder.scrabblehelper')
    })

    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault()
        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        let subject = document.getElementById('subject').value
        let message = document.getElementById('form-message').value

        let link = document.createElement('a')
        link.href = `mailto:coffeecoder05@gmail.com?subject=${subject}&body=${message}`
        link.click()
        Element.remove(link)
        
        document.getElementById('submit-text').style.display = "block"
        document.getElementById('submit-text').style.opacity = "1"
        setTimeout(function(){document.getElementById('submit-text').style.display="none";document.getElementById('submit-text').style.opacity="0"}, 3000)

    })



    document.getElementById('main-icon').addEventListener('click', () => {
        scroll({
            top: 0,
            behavior: "smooth"
        });
    })

    document.getElementById('back').addEventListener('click', () => {
        scroll({
            top: 0,
            behavior: "smooth"
        });
    })

    let imageContainers = document.querySelectorAll('.image-container')
    for(let i =0;i<imageContainers.length;i++){
        let overlay = imageContainers[i].querySelector('.overlay')
        let params = imageContainers[i].querySelector('.project-image').getBoundingClientRect()
        let offsetLeft = params.x - imageContainers[i].getBoundingClientRect().x
        overlay.style.height = params.height + "px"
        overlay.style.width = params.width + "px"
        overlay.style.left = offsetLeft + "px"
    }
};

function generateGradient(){
    let body = document.body
    let html = document.documentElement

    let height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    let multiplier = window.pageYOffset/(height-window.innerHeight)
    let offset = [-3,7,11]
    let per1 = offset[0] + ((65-offset[0])*multiplier)
    let per2 = offset[1] + ((71-offset[1])*multiplier)
    let per3 = offset[2] + ((74-offset[2])*multiplier)
    return `linear-gradient(110.24deg, #262A32 0%, rgba(60, 60, 61, 0.579177) ${per1}%, rgba(80, 80, 80, 0.53141) ${per2}%, rgba(47, 48, 49, 0.464583) ${per3}%, rgba(38, 42, 50, 0) 100%), url(./assets/images/background.jpg)`
}
if(!isMobile){
    document.addEventListener('scroll', updateGradient, { capture: false, passive: true})
}


function updateGradient(){
    if(!isMobile){
        document.getElementById('background-image').style.backgroundImage = generateGradient()
    }
}


window.addEventListener('resize', () =>
{
    let properWidth = document.getElementById('header-container').getBoundingClientRect().width
    let elems = document.getElementsByClassName('section')
    for(let i = 0;i<elems.length;i++){
        elems[i].style.width = properWidth + "px"
    }
    document.getElementById('bottom-bar').style.width =properWidth + "px"

    let imageContainers = document.querySelectorAll('.image-container')
    for(let i =0;i<imageContainers.length;i++){
        let overlay = imageContainers[i].querySelector('.overlay')
        let params = imageContainers[i].querySelector('.project-image').getBoundingClientRect()
        let offsetLeft = params.x - imageContainers[i].getBoundingClientRect().x
        overlay.style.height = params.height + "px"
        overlay.style.width = params.width + "px"
        overlay.style.left = offsetLeft + "px"
    }
})


let queuedAnims = []
let tl = gsap.timeline()
tl.from(".main",{y:200, opacity:0, duration:2, ease: "power1"})
tl.from(".sub-content",{y:200, opacity:0, duration:1, ease: "power1"})

let skillBarTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#skills',
    }
  })
  .call(checkIfScrolled)
  .from(".progress", { width: '0%' , duration: 1, onComplete: resetStyles});

let hasScrolled = false;
function checkIfScrolled() {
  if(!hasScrolled) {
    queuedAnims.push(this.parent.pause(0));
  }
}

function startAnims() {
    hasScrolled = true;
    queuedAnims.forEach(tween => tween.play());
    window.removeEventListener("scroll", startAnims);
  }
  window.addEventListener("scroll", startAnims);

function resetStyles(){
    let elems = document.querySelectorAll('.progress')
    for(let i = 0;i<elems.length;i++){
        elems[i].style.removeProperty('width')
    }
}

