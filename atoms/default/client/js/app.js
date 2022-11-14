// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : football-daily-thrasher : load',
        value: 1
    });
}


function invertColorOnIframeResultPages(event) {
    if (!event.data.subject || event.data.subject !== "emailEmbedPageLoaded") {
      return;
    }
    
    if (!event.data.path || typeof event.data.path !== "string") {
      return;
    }
    if (
      !event.data.path.startsWith("/email/error") && 
      !event.data.path.startsWith("/email/success")
    ) {
      return;
    }
    if (event.origin !== window.origin) {
      console.warn('emailEmbedPageLoaded received from wrong origin:', event.origin)
      return;
    }
    var iframesOnDarkBackgrounds = [
      ...document.querySelectorAll(
        ".football-daily-thrasher__embed-container iframe.invert-colors"
      ),
    ];
  
    iframesOnDarkBackgrounds.forEach(function (iframe) {
      if (iframe.contentWindow === event.source) {
        iframe.style.filter = "invert(1)";
      }
    });
  }
  
window.addEventListener("message", invertColorOnIframeResultPages, false);

