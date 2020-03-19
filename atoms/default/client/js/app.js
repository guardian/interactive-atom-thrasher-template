// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : add-your-thrasher-name : load',
        value: 1
    });
}

let thrasher = document.querySelector('.facia-snap > .coronavirus-newsletter');
let inApp = (document.body.classList.contains('ios')
    || document.body.classList.contains('android'));

if (thrasher && !inApp && Element.prototype.closest) {
    // only do this for web,
    // and easy to find .closest() section

    let section = thrasher.closest('section');
    let prevSection = section.previousElementSibling;
    let nextSection = section.nextElementSibling;

    if (!prevSection.classList.contains('fc-container')) {
        prevSection = prevSection.previousElementSibling;
    }
    if (!nextSection.classList.contains('fc-container')) {
        nextSection = nextSection.previousElementSibling;
    }

    if (nextSection.classList.contains('fc-container--thrasher')) {
        section.classList.add('followed-by-thrasher');
    }
    if (prevSection.classList.contains('fc-container--story-package')) {
        section.classList.add('preceded-by-dynamo');
    }

    if (prevSection.id == 'coronavirus' ||
        prevSection.id == 'coronavirus-around-the-world' ||
        prevSection.id == 'coronavirus-explained' ||
        prevSection.id == 'coronavirus-opinion' ||
        prevSection.id == 'cv-explained-thrasher' ||
        prevSection.id == 'coronavirus-uk') {
        section.classList.add('preceded-by-dynamo-like');
    }

}

let inCoronaFront = (window.location.href.indexOf('/world/coronavirus-outbreak') >= 0);
if (inCoronaFront || inApp) {
    thrasher.classList.add('hide-full-coverage');
    let fcThrasher = document.querySelector('section#coronavirus-in-depth');
    if (fcThrasher) {
        fcThrasher.style.display = 'none';
    }
}
