// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : dw-weekly-mag-sub-mar-21 : load',
        value: 1
    });
}
// console.log('app.js is loading');
const thrasherImgContainer = document.querySelector(".dw-weekly-mag-sub-mar-21__image");
// const thrasherImgs = document.querySelectorAll('img[class^="thrasher-cover"]');
const dwImgContainerClass = "dw-zoom-container";

var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true) {
    thrasherImgContainer.classList.add(dwImgContainerClass);
    // console.log('observer function in view');
  } else if(entries[0].isIntersecting === false){
    thrasherImgContainer.classList.remove(dwImgContainerClass);
  }
}, { threshold: [1] });

observer.observe(thrasherImgContainer);


function getCookieValue(name) {
    var val = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return val ? val.pop() : undefined;
}

function shouldHideSupportMessaging() {
    return getCookieValue('gu_hide_support_messaging') === 'true';
}

const thrasherSection = document.getElementById("digital-subscription");
if (shouldHideSupportMessaging()) {
    thrasherSection.style.display = "none";
} else {
    thrasherSection.style.display = "block";
}
