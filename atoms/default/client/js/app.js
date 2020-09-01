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
    selectVersion();
}

// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : uni guide 2021 : load',
        value: 1
    });
}

function selectVersion() {
    // 50-50 split between
    // n=1 and n=2
    let n = Math.floor(Math.random() * 2) + 1;

    const thrasherEl = document.querySelector('.uni-guide-2021');
    if (thrasherEl) {
        thrasherEl.classList.add(`version-${n}`);
    }
}


