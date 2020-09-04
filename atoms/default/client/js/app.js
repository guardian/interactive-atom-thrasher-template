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


    // runTest();
}



// function runTest() {
//     const tests = 100000;
//     let score = {'1': 0, '2': 0}
//     for (let i = 0; i < tests; i++) {
//         let n = Math.floor(Math.random() * 2) + 1;
//         score[n]++;
//     }
//     console.log('—');
//     console.log('—');
//     console.log('—');
//     console.log('—');
//     console.log('—');
//     console.log('—');
//     console.log(score);
//     console.log(score[1]-score[2]);
//     console.log((score[1] - score[2])/tests*100);
//     console.log('—');
//     console.log('—');
//     console.log('—');
//     console.log('—');
//     console.log('—');
//     console.log('—');
// }