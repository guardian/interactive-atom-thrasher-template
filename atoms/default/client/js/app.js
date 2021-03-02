// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : digital-subscription-ideas : load',
        value: 1
    });
}

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
