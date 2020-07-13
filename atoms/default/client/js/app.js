// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : black-history-timeline : load',
        value: 1
    });
}





var thrasher = document.querySelector('.black-history-timeline');

var isInViewport = function (thrasher) {
    var bounding = thrasher.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};


document.addEventListener('scroll', function (event) {
    if (isInViewport(thrasher)) {
        thrasher.classList.add('step1');
    } else {
        thrasher.classList.remove('step1');
    }
});