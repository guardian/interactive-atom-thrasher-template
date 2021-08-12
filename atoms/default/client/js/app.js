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

var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true) {
    docthrasher.classList.add(animClass);
    playVid();
		console.log('Element is fully visible in screen - ' + document.getElementById("docVideo"));
  } else if(entries[0].isIntersecting === false){
    docthrasher.classList.remove(animClass);
    pauseVid();
    console.log('Gone - ' + document.getElementById("docVideo"));
  }
}, { threshold: [1] });

if (!mediaQuery || mediaQuery.matches) {
  // Turn video off
  vid.pause();

} else {
  // turn video on
  observer.observe(docthrasher);

}
