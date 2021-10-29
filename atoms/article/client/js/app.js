// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : add-your-thrasher-name : load',
        value: 1
    });
}

// const mobileWidth = window.matchMedia('(max-width: 740px)')
// const setImageNamePath = () => mobileWidth.matches ? 'mob-' : '';
// const setImageWIdth = () => mobileWidth.matches ? '220' : '480';

// const setImageWIdth = 480;
// // parent.postMessage("msg", "app.js loaded'");
// // console.log('app.js loaded');
// // window.parent to be added if iOS
// const html = window.parent.document.documentElement;
// const canvas = document.getElementById("environment-moment-2021-thrasher");
// const context = canvas.getContext("2d");
// const thrasher = document.getElementById("nugget_environment-moment-2021");
// // const thrasher = window.frameElement.className;
//
// // context.fillStyle = "red";
// // context.fillRect(0, 0, canvas.width, canvas.height);
// // parent.postMessage("This is your child calling","http://localhost:8000");
// parent.postMessage("This is your child calling - ","*"); // works without url;
// // window.parent.postMessage("This is your child calling - ", "http://localhost:8000");
// // parent.postMessage("html: " + html, "*"); // needs code in parent to readback
// // num of images
// const frameCount = 36;
// // Scroll
// // <%= path %>
// const currentFrame = index => (
//   `<%= path %>/globe-${index.toString().padStart(2, '0')}.jpg`
// )
// const preloadImages = () => {
//   for (let i = 1; i < frameCount; i++) {
//     const img = new Image();
//     img.src = currentFrame(i);
//   }
// };
//
// function elemPos() {
//   const elemPos = thrasher.getBoundingClientRect().top;
//   const elemHeight = thrasher.offsetHeight;
//   const viewPortHeight = window.innerHeight; //
//   const scrollValue = Math.abs(elemPos - viewPortHeight);
//   const scrollFraction = scrollValue / (viewPortHeight + elemHeight); // bingo! doesn't stop at top of viewport
//   const frameIndex = Math.min(
//     frameCount - 1,
//     Math.floor(scrollFraction * frameCount)
//   );
//   return frameIndex;
// }
//
// function scrollListener(frameIndex) {
//   frameIndex = elemPos();
//   requestAnimationFrame(() => updateImage(frameIndex + 1)); // call update image function to draw frames
// }
//
// // Create, load and draw the image from the point it is in the viewport
// const img = new Image();
// img.src = currentFrame(elemPos());
//
// // canvas.width = setImageWIdth();
// canvas.width = 480; // is this the best way?
// canvas.height = 220;
// // make dynamic
// img.onload=function(){
//   InitCanvas();
//   // img.src = "<%= path %>/globe-00.jpg"; // try and draw img in canvas
// }
// function InitCanvas() {
//   context.drawImage(img, 0, 0);
// }
// // update the image on the canvas
// const updateImage = index => {
//   img.src = currentFrame(index);
//   context.drawImage(img, 0, 0);
// }
//
// // Listen for the scroll event
// document.addEventListener( 'scroll', event => {
//   scrollListener();
// })
//
// function browserResize() {
//   canvas.width = setImageWIdth();
//   img.src = currentFrame(elemPos());
// }
//
// window.onresize = browserResize;
// preloadImages();
