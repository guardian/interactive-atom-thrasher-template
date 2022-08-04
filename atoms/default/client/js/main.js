var el = document.createElement('script');
el.src = '<%= atomPath %>/app.js';
document.body.appendChild(el);

if (window.resize) {
  const html = document.querySelector('html')
  const body = document.querySelector('body')

  html.style.overflow = 'hidden'
  html.style.margin = '0px'
  html.style.padding = '0px'

  body.style.overflow = 'hidden'
  body.style.margin = '0px'
  body.style.padding = '0px'
}

if (
  window.frameElement &&
  window.frameElement.classList.contains("interactive-atom-fence")
) {
  var embedhtml = document.querySelector("html");
  var embedbody = document.querySelector("body");
  embedbody.classList.add("ge-liveblog");
  embedhtml.style.overflow = "hidden";
  embedhtml.style.padding = "0";
  embedhtml.style.margin = "0";
  embedbody.style.overflow = "hidden";
  embedbody.style.padding = "0";
  embedbody.style.margin = "0";
  setTimeout(() => {
    window.resize();
  }, 100);
}

var el = document.createElement('script');
el.src = '<%= atomPath %>/app.js';
document.body.appendChild(el);

if (window.resize) {
  const html = document.querySelector('html')
  const body = document.querySelector('body')

  html.style.overflow = 'hidden'
  html.style.margin = '0px'
  html.style.padding = '0px'

  body.style.overflow = 'hidden'
  body.style.margin = '0px'
  body.style.padding = '0px'
}

if (
  window.frameElement &&
  window.frameElement.classList.contains("interactive-atom-fence")
) {
  var embedhtml = document.querySelector("html");
  var embedbody = document.querySelector("body");
  embedbody.classList.add("ge-liveblog");
  embedhtml.style.overflow = "hidden";
  embedhtml.style.padding = "0";
  embedhtml.style.margin = "0";
  embedbody.style.overflow = "hidden";
  embedbody.style.padding = "0";
  embedbody.style.margin = "0";
  setTimeout(() => {
    window.resize();
  }, 100);
}


var target = document.getElementById('securedrop-eyes-target');
var targetY = target.getBoundingClientRect().top;
document.onscroll = throttle(function (e) {
  if (isMobile()) {
    var windowY = window.innerHeight;

    var cursorX = window.innerWidth * 2 / 3
    var cursorY = windowY - targetY;
    moveEyes(cursorX, cursorY);
  }
}, 200);


document.onmousemove = throttle(function (e) {
  var cursorX = e.pageX;
  var cursorY = e.pageY - window.scrollY;
  moveEyes(cursorX, cursorY);
}, 400);



// https://remysharp.com/2010/07/21/throttling-function-calls
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
    deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

function moveEyes(cursorX, cursorY) {
  var windowX = window.innerWidth;
  var windowY = window.innerHeight;

  var target = document.getElementById('securedrop-eyes-target');
  var targetX = target.getBoundingClientRect().left;
  var targetY = target.getBoundingClientRect().top;

  var ratioX = findCoord(cursorX, targetX, windowX);
  var ratioY = findCoord(cursorY, targetY, windowY);

  var percentX = ratioToOffset(ratioX * 0.3);
  var percentY = ratioToOffset(ratioY * 0.3);

  var eyeBalls = document.querySelectorAll('.eye .inside');
  for (var i = 0; i < eyeBalls.length; i++) {
    eyeBalls[i].style.left = percentX + '%';
    eyeBalls[i].style.top = percentY + '%';
  }
}

function findCoord(cursor, target, win) {
  var diff = cursor - target;
  if (diff > 0) {
    var fullOffset = (win - target) / 2;
  } else {
    var fullOffset = target / 2;
  }
  var ratio = diff / fullOffset;
  return ratio;
}

function ratioToOffset(r) {
  return Math.min(Math.max(Math.round((0.5 + (r * 0.3)) * 100), 30), 70);
}

function isMobile() {

  function isIOS() {
    return /(iPad|iPhone|iPod touch)/i.test(navigator.userAgent);
  }

  function isAndroid() {
    return /Android/i.test(navigator.userAgent);
  }

  return isIOS() || isAndroid();
}