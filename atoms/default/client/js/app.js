// data capture for ophan
function trackLoad() {
  window.guardian.ophan.record({
    component: "thrasher : add-your-thrasher-name : load",
    value: 1,
  });
}

const allCovers = document.querySelector(".best-music__covers");
const albumCovers = document.querySelectorAll(".best-music__covers__image");
let currentCover = 0;
let z = 1;

// move covers on load
allCovers.addEventListener("load", loadMove());

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
  albumCovers[currentCover].style.zIndex = z;
});

// var thrasher = document.querySelector(".best-music");

// var isInViewport = function (thrasher) {
//   var bounding = thrasher.getBoundingClientRect();
//   return (
//     bounding.top >= 0 &&
//     bounding.left >= 0 &&
//     bounding.bottom <=
//       (window.innerHeight || document.documentElement.clientHeight) &&
//     bounding.right <=
//       (window.innerWidth || document.documentElement.clientWidth)
//   );
// };

// const allCovers = document.querySelector(".best-music__covers");
// const albumCovers = document.querySelectorAll(".best-music__covers__image");
// let currentCover = 0;
// let z = 1;

// // move covers on load
// // allCovers.addEventListener("load", loadMove());

// function loadMove() {
//   albumCovers.forEach((cover) => {
//     const x = 600 * Math.random() - 25;
//     const r = 30 * Math.random() - 5;
//     const y = 20 * Math.random() - 40;
//     cover.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
//   });
// }

// function moveBack() {
//   albumCovers.forEach((cover) => {
//     const x = 0;
//     const r = 0;
//     const y = 0;
//     cover.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
//   });
// }

// document.addEventListener("scroll", function (event) {
//   if (isInViewport(thrasher)) {
//     thrasher.classList.add("step1");
//     loadMove();
//   } else {
//     moveBack();
//   }
// });
