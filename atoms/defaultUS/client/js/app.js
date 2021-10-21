// data capture for ophan
function trackLoad() {
  window.guardian.ophan.record({
    component: "thrasher : investigations-2021 : load",
    value: 1
  });
}

function getCookieValue(name) {
  var val = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return val ? val.pop() : undefined;
}

function shouldHideSupportMessaging() {
  return getCookieValue("gu_hide_support_messaging") === "true";
}

if (shouldHideSupportMessaging()) {
  document.getElementById("investigation-subscription").style.display = "none";
} else {
  document.getElementById("investigation-subscription").style.display = "block";
}
