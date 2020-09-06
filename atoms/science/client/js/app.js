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
}

// data capture for ophan
function trackLoad() {
    document.body.dataset.uniGuide='0941';
    if (!document.body.classList.contains('app')) {
        window.guardian.ophan.record({
            component: 'thrasher : uni guide 2021 : load',
            value: 1
        });
    }
}
