// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : 2022-documentary-template : load',
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


const docthrasher = document.querySelector('[id^="thrasher__university-guide"]');
var vid = document.getElementById("docVideo");
const animClass = "dw-video";

// Grab the prefers reduced media query.
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function playVid() {
    vid.play();
}

function pauseVid() {
    vid.pause();
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


if (mediaQuery.matches) {
  // Turn video off
  vid.pause();

} else {
  // turn video on
  if ( document.body.classList.contains("ios") || document.body.classList.contains("android" )) {
    playVid();
    vid.setAttribute("autoplay", "");
  } else {
    observer.observe(docthrasher);
  }
}