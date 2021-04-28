// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : g200-article-banner : load',
        value: 1
    });
}


var index = 0
var e = document.getElementById('container')
var myVar = setInterval(changeText, 3800)

function changeText () {
    // get current active element
    var current = container.getElementsByClassName('active')[0]
    current.classList.remove('active')
    // get next element
    var next = current.nextElementSibling || container.firstElementChild
    next.classList.add('active')
    index++

    if(index >= 4) {
        clearInterval(myVar)
    }
}



