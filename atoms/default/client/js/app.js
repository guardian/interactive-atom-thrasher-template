// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : 2023-documentary-template : load',
        value: 1
    });
}

// THIS FUNCTION CHECKS IF A USER IS A SUBSCRIBER AND HIDES THE THRASHER. 
// UPDATE THE CONTAINER NAME ON LINES 21 & 23
// function getCookieValue(name) {
//     var val = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//     return val ? val.pop() : undefined;
// }
// function shouldHideSupportMessaging() {
//     return getCookieValue('gu_hide_support_messaging') === 'true';
// }
// if (shouldHideSupportMessaging()) {
//     document.getElementById("#").style.display = "none";
// } else {
//     document.getElementById("#").style.display = "block";
// }

const pauseButton = document.querySelector('.documentary-template-2023__content-wrapper__pause-button');
const pauseSvg = document.querySelector('.documentary-template-2023__content-wrapper__pause-button svg.pause');
const playSvg = document.querySelector('.documentary-template-2023__content-wrapper__pause-button svg.play');
const docthrasher = document.querySelector('[id^="thrasher__documentary-template-2023"]');
var vid = document.getElementById("docVideo");
const animClass = "dw-video";
let playing = false;

// Grab the prefers reduced media query.
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function playVid() {
  vid.play();
  playSvg.classList.remove('active');
  pauseSvg.classList.add('active');
  playing = true;
}

function pauseVid() {
  vid.pause();
  playSvg.classList.add('active');
  pauseSvg.classList.remove('active');
  playing = false;
}

var observer = {
  root: document.body,
  rootMargin: "0px"
};

var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true) {
    docthrasher.classList.add(animClass);
    playVid();
  } else if(entries[0].isIntersecting === false){
    docthrasher.classList.remove(animClass);
    pauseVid();
  }
}, { threshold: [0.95] });

playSvg.classList.add('active');
pauseSvg.classList.remove('active');


if (mediaQuery.matches) {
  // Turn video off
  pauseVid();
} else {
  // turn video on
  if ( document.body.classList.contains("ios") || document.body.classList.contains("android" )) {
    playVid();
    vid.setAttribute("autoplay", "");
  } else {
    observer.observe(docthrasher);
  }
}
pauseButton.addEventListener('click', () => {
  if (playing) { 
    pauseVid();
  } else { 
    playVid();
  }
});

