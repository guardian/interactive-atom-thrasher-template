// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : aspacetobe : load',
        value: 1
    });
}

const thrasherImgContainer = document.querySelector(".aspacetobe__image");
const dwImgContainerClass = "dw-zoom-container";

var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true) {
    thrasherImgContainer.classList.add(dwImgContainerClass);
		// console.log('Element is fully visible in screen');
  } else if(entries[0].isIntersecting === false){
    thrasherImgContainer.classList.remove(dwImgContainerClass);
    // console.log('Gone');
  }
}, { threshold: [1] });

observer.observe(thrasherImgContainer);
