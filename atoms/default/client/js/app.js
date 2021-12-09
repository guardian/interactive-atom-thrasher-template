// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : charity-appeal-2021 : load',
        value: 1
    });
}

// THIS FUNCTION CHECKS IF A USER IS A SUBSCRIBER AND HIDES THE THRASHER. 
// UPDATE THE CONTAINER NAME ON LINES 21 & 23
// function getCookieValue(name) {
//     var val = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//     return val ? val.pop() : undefined;
// }
// function shouldHideSupportMessaging() {
//     return getCookieValue('gu_hide_support_messaging') === 'true';
// }
// if (shouldHideSupportMessaging()) {
//     document.getElementById("#").style.display = "none";
// } else {
//     document.getElementById("#").style.display = "block";
// }
