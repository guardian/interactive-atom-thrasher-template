// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : add-your-thrasher-name : load',
        value: 1
    });
}

const wrapper = document.querySelector(".cv-charity")

if (document.body.classList.contains("android") || document.body.classList.contains(".android")) {
  wrapper.classList.add("animate")
} else {
  document.addEventListener("scroll", function () {
    const offset = wrapper.getBoundingClientRect().top - (window.innerHeight * 0.8)
    // console.log((offset < 0), !wrapper.classList.contains("animate"))
    if (offset < 0) {
      wrapper.classList.add("animate")
    } if (offset < -window.innerHeight) {
      wrapper.classList.remove("animate")
    }
    if (offset > 0) {
      wrapper.classList.remove("animate")
    }
    // console.log(offset)
  })
}

if (document.body.classList.contains("ios") || document.body.classList.contains(".ios")) {
  wrapper.classList.add("animate")
}