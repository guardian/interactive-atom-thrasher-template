function checkExists(startThrasherFunction) {
    var checkInterval = setInterval(function () {
        if (document.querySelector('.uni-guide-2021')) {
            startThrasherFunction();
            clearInterval(checkInterval);
        }
    }, 100);
}

checkExists(thrasherMain);


function thrasherMain() {
    trackLoad();
    console.log('this is science');
}

// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : uni guide 2021 : load',
        value: 1
    });
}
