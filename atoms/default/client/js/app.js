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

(() => {
    "use strict";
    (window.trackLoad = function () {
      window.guardian.ophan.record({
        component: 'thrasher : first-edition : load',
        value: 1,
      });
    }),
      window.addEventListener(
        "message",
        (e) => {
          var t = document.querySelector(
            ".first-edition-thrasher__embed-container iframe"
          );
          if ("https://www.theguardian.com" === e.origin) {
            var r;
            try {
              r = JSON.parse(e.data);
            } catch (e) {}
            r && "set-height" === r.type && (t.style.minHeight = r.value + "px");
          }
        },
        !1
      );
  })();
  