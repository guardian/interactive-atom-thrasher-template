// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : rip-seni : load',
        value: 1
    });
}

const docthrasher = document.querySelector('[id^="docthrasher-"]');
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
