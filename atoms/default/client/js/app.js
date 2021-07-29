// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : the-return : load',
        value: 1
    });
}

const docthrasher = document.querySelector('[id^="docthrasher-"]');
var vid = document.getElementById("docVideo");
const animClass = "dw-video";

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

// document.addEventListener("DOMContentLoaded", function(event) {
  observer.observe(docthrasher);
// });
