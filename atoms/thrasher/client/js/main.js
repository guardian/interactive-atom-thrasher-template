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
