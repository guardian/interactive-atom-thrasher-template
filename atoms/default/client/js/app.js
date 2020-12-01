// data capture for ophan
function trackLoad() {
  window.guardian.ophan.record({
    component: "thrasher : all-music-reviews : load",
    value: 1,
  });
}

const allCovers = document.querySelector(".best-music__covers");
const albumCovers = document.querySelectorAll(".best-music__covers__image");
let currentCover = 0;
let z = 1;


function loadMove() {
  albumCovers.forEach((cover) => {
    const x = 600 * Math.random() - 25;
    const r = 30 * Math.random() - 20;
    const y = 20 * Math.random() - 40;
    cover.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
  });
}

// move covers to top on click
document.addEventListener("scroll", function (event) {
  var currentCover = currentCover + 1;
  if (currentCover > albumCovers.length - 1) {
    currentCover = 0;
  }
  z = z + 1;
  if (albumCovers && albumCovers[currentCover]) {
    albumCovers[currentCover].style.zIndex = z;
  }
});


const wrapper = document.querySelector(".best-music")

if (document.body.classList.contains("android") || document.body.classList.contains(".android")){
  loadMove()
} else {
  document.addEventListener("scroll", function () {
    const offset = wrapper.getBoundingClientRect().top - (window.innerHeight * 0.8)
    console.log((offset < 0), !wrapper.classList.contains("animate"))
    if ((offset < 0) && !wrapper.classList.contains("animate")) {

      wrapper.classList.add("animate")
      loadMove()
      console.log("animate")
    }
  })
}
if (document.body.classList.contains("ios") || document.body.classList.contains(".ios")){
  loadMove()
}