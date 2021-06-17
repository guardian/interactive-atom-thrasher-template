// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : the-return : load',
        value: 1
    });
}

const docthrasher = document.querySelector('[id^="docthrasher-"]');
const animClass = "dw-zoomin";

var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true) {
    docthrasher.classList.add(animClass);
		// console.log('Element is fully visible in screen');
  } else if(entries[0].isIntersecting === false){
    docthrasher.classList.remove(animClass);
    // console.log('Gone');
  }
}, { threshold: [1] });

// document.addEventListener("DOMContentLoaded", function(event) {
  observer.observe(docthrasher);
// });
