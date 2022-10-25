function trackLoad() {
  window.guardian.ophan.record({
    component: "thrasher : multi-newsletter-culture : load",
    value: 1,
  });
}
window.trackLoad = trackLoad;

function initCardSections() {
  var thrashersWithCardSections = [
    ...document.querySelectorAll('[data-role="multi-thrasher-with-cards"]'),
  ];

  thrashersWithCardSections.forEach(function (thrasher) {
    if (thrasher.getAttribute("data-card-section-initialised") === "true") {
      return;
    }
    var lastScrollCheckTime = 0;
    var lastButtonClickTime = 0
    var cardHolder = thrasher.querySelector(
      '[data-role="multi-thrasher-card-holder"]'
    );

    if (!cardHolder) {
      return;
    }

    var leftButtons = [
      ...thrasher.querySelectorAll(
        '[data-role="multi-thrasher-scroll-left-button"]'
      ),
    ];
    var rightButtons = [
      ...thrasher.querySelectorAll(
        '[data-role="multi-thrasher-scroll-right-button"]'
      ),
    ];

    function getScrollDistance() {
      return cardHolder.children[0].offsetWidth + 20;
    }

    function setDisabled(intendedPosition) {
      if (intendedPosition <= 0) {
        leftButtons.forEach(function (button) {
          button.setAttribute("disabled", "true");
        });
      } else {
        leftButtons.forEach(function (button) {
          button.removeAttribute("disabled");
        });
      }

      if (intendedPosition + cardHolder.offsetWidth >= cardHolder.scrollWidth) {
        rightButtons.forEach(function (button) {
          button.setAttribute("disabled", "true");
        });
      } else {
        rightButtons.forEach(function (button) {
          button.removeAttribute("disabled");
        });
      }
    }
    function scrollLeft() {
      var intendedPosition = cardHolder.scrollLeft - getScrollDistance();
      lastButtonClickTime = Date.now()
      cardHolder.scrollTo({
        left: intendedPosition,
        top: 0,
        behavior: "smooth",
      });
      setDisabled(intendedPosition);
    }
    function scrollRight() {
      var intendedPosition = cardHolder.scrollLeft + getScrollDistance();
      lastButtonClickTime = Date.now()
      cardHolder.scrollTo({
        left: intendedPosition,
        top: 0,
        behavior: "smooth",
      });
      setDisabled(intendedPosition);
    }

    function throttledSetDisabled(event) {
      var now = Date.now();
      var sinceLastCheck = now - lastScrollCheckTime
      var sinceLastButtonClick = now - lastButtonClickTime

      if (sinceLastCheck > 100 && sinceLastButtonClick > 2000) {
        lastScrollCheckTime = now;
        window.setTimeout(function() {
          setDisabled(cardHolder.scrollLeft)
        }, 100)
      }
    }

    window.addEventListener("resize", function () {
      setDisabled(cardHolder.scrollLeft);
    });
    leftButtons.forEach(function (button) {
      button.addEventListener("click", scrollLeft);
    });
    rightButtons.forEach(function (button) {
      button.addEventListener("click", scrollRight);
    });
    cardHolder.addEventListener("scroll", throttledSetDisabled);
    setDisabled(0);
    thrasher.setAttribute("data-card-section-initialised", "true");
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
      ".newsletter-card__iframe-wrapper iframe.invert-colors"
    ),
  ];

  iframesOnDarkBackgrounds.forEach(function (iframe) {
    if (iframe.contentWindow === event.source) {
      iframe.style.filter = "invert(1)";
    }
  });
}

window.addEventListener("message", invertColorOnIframeResultPages, false);
initCardSections();
