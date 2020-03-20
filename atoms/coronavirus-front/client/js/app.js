// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : add-your-thrasher-name : load',
        value: 1
    });
}

let thrasher = document.querySelector('.facia-snap > .coronavirus-newsletter, .interactive-atom > .coronavirus-newsletter');
let inApp = (document.body.classList.contains('ios')
    || document.body.classList.contains('android'));

if (thrasher && Element.prototype.closest && thrasher.closest('section')) {
    // only do this for web,
    // and easy to find .closest() section

    let section = thrasher.closest('section');
    let prevSection = section.previousElementSibling;
    let nextSection = section.nextElementSibling;

    if (!prevSection.classList.contains('fc-container') || prevSection.offsetHeight == 0) {
        prevSection = prevSection.previousElementSibling;
    }
    if (!nextSection.classList.contains('fc-container')) {
        nextSection = nextSection.nextElementSibling;
    }

    if (prevSection.classList.contains('fc-container--story-package')) {
        section.classList.add('preceded-by-dynamo');
    }

    if (prevSection.id == 'coronavirus' ||
        prevSection.id == 'coronavirus-around-the-world' ||
        prevSection.id == 'coronavirus-explained' ||
        prevSection.id == 'coronavirus-opinion' ||
        prevSection.id == 'cv-explained-thrasher' ||
        prevSection.id == 'guardian-community' ||
        prevSection.id == 'coronavirus-uk') {
        section.classList.add('preceded-by-dynamo-like');
    }

}

let inCoronaFront = (window.location.href.indexOf('/world/coronavirus-outbreak') >= 0);
// only change: this version never shows the cv front link
if (false) {
    thrasher.classList.add('show-full-coverage');
    let fcThrasher = document.querySelector('section#coronavirus-in-depth');
    if (fcThrasher) {
        fcThrasher.style.display = 'none';
    }
}
