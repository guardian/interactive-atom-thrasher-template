(()=>{"use strict";window.trackLoad=function(){window.guardian.ophan.record({component:"thrasher : pushing-buttons-thrasher : load",value:1})},[...document.querySelectorAll('[data-role="multi-thrasher-with-cards"]')].forEach((t=>{if("true"===t.getAttribute("data-card-section-initialised"))return;const e=t.querySelector('[data-role="multi-thrasher-card-holder"]');if(!e)return;const r=[...t.querySelectorAll('[data-role="multi-thrasher-scroll-left-button"]')],o=[...t.querySelectorAll('[data-role="multi-thrasher-scroll-right-button"]')];function i(){return e.children[0].offsetWidth+20}function l(t){t<=0?r.forEach((t=>t.setAttribute("disabled","true"))):r.forEach((t=>t.removeAttribute("disabled"))),t+e.offsetWidth>=e.scrollWidth?o.forEach((t=>t.setAttribute("disabled","true"))):o.forEach((t=>t.removeAttribute("disabled")))}function a(){const t=e.scrollLeft-i();e.scrollTo(t,0),l(t)}function c(){const t=e.scrollLeft+i();e.scrollTo(t,0),l(t)}window.addEventListener("resize",(function(){l(e.scrollLeft)})),r.forEach((t=>t.addEventListener("click",a))),o.forEach((t=>t.addEventListener("click",c))),l(0),t.setAttribute("data-card-section-initialised","true")}))})();