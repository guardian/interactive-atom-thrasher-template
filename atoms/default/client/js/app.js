// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : dw-200-birthday : load',
        value: 1
    });
}
// Put this into an alternative js file and link
// observer function target
const thrasherImgContainer = document.querySelector('div[class$="__background"]');
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
    // console.log('in view');
    addClass();
  } else if(entries[0].isIntersecting === false){
    // console.log('out of view');
    removeClass();
  }
}, { threshold: [1] });

observer.observe(thrasherImgContainer);
