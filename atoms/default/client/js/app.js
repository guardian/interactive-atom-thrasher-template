// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : scars documentary : load',
        value: 1
    });
}

function thrasherMain() {
    checkThrasherOnScreen();

    window.addEventListener('scroll', function () {
        checkThrasherOnScreen();
    });
}

function checkThrasherOnScreen() {
    var thrasher = document.querySelector('.docs__scars');
    var r = onScreenRatio(thrasher);
    // r = 1 when the the thrasher at the bottom or further
    // r = 0.5 when the thrasher is in the middle
    // r = 0 when the thrasher hits the top of the screen

    if (r > 0.85) {
        thrasher.dataset.step = 'pre';
    } else {
        thrasher.dataset.step = 'post';
    }
}

function onScreenRatio(el) {
    var viewportHeight = window.innerHeight,
        scrollTop = window.scrollY,
        elementOffsetTop = el.getBoundingClientRect().top,
        elementHeight = el.offsetHeight,
        elementOffsetMiddle = (elementOffsetTop + (elementHeight / 2));

    // choose a reference point:
    // A: the vertical middle of the thrasher
    const thrasherReferencePoint = elementOffsetMiddle;

    // B: the top of the thrasher
    // const thrasherReferencePoint = elementOffsetTop;

    if (thrasherReferencePoint > (viewportHeight)) {
        return 1;
    } else if (thrasherReferencePoint < 0) {
        return 0;
    } else {
        var ratio = (thrasherReferencePoint / viewportHeight);
        return ratio;
    }
}


function checkExists(startThrasherFunction) {
    var checkInterval = setInterval(function () {
        if (document.querySelector('.docs__scars')) {
            startThrasherFunction();
            clearInterval(checkInterval);
        }
    }, 100);
}

checkExists(thrasherMain);

