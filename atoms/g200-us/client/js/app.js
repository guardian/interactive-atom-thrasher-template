// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : dw-200-birthday : load',
        value: 1
    });
}

// observer function target
const thrasherImgContainer = document.querySelector('.thrasher-inner');
// target comp img elements
const thrasherImgs = document.querySelectorAll('img[class^="dw-layer-"]');
const dwImgAnimClass = "dw-ly-focus-";

// add class
function addClass() {
  for(var i = 0; i < thrasherImgs.length; i++) {
      thrasherImgs[i].classList.add(dwImgAnimClass+[i]);
  }
}
// remove class
function removeClass() {
  for(var i = 0; i < thrasherImgs.length; i++) {
      thrasherImgs[i].classList.remove(dwImgAnimClass+[i]);
  }
}
// when in viewport
var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true) {
    addClass();
  } else if(entries[0].isIntersecting === false){
    removeClass();
  }
}, { threshold: [1] });

observer.observe(thrasherImgContainer);
