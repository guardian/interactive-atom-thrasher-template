// data capture for ophan
function trackLoad() {
    window.guardian.ophan.record({
        component: 'thrasher : dw-cop26-header-tr : load',
        value: 1
    });
}

const mobileWidth = window.matchMedia('(max-width: 740px)');
const setImageNamePath = () => mobileWidth.matches ? 'mob-' : '';
const setImageWIdth = () => mobileWidth.matches ? '220' : '480';

// ----------------------- framescroll
const html = document.documentElement;
const canvas = document.getElementById("dw-cop26-magic-thrasher");
const context = canvas.getContext("2d");
const thrasher = document.getElementById("thrasher__dw-cop26-header-tr");

// num of images
const frameCount = 36;
// Scroll
const currentFrame = index => (
  `<%= path %>/globe-${setImageNamePath()}${index.toString().padStart(2, '0')}.jpg`
)
const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

function elemPos() {
  const elemPos = thrasher.getBoundingClientRect().top;
  const elemHeight = thrasher.offsetHeight;
  const viewPortHeight = window.innerHeight; //
  const scrollValue = Math.abs(elemPos - viewPortHeight);
  const scrollFraction = scrollValue / (viewPortHeight + elemHeight); // bingo! doesn't stop at top of viewport
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );
  return frameIndex;
}

function scrollListener(frameIndex) {
  frameIndex = elemPos();
  requestAnimationFrame(() => updateImage(frameIndex + 1)); // call update image function to draw frames
}
// Create, load and draw the image from the point it is in the viewport
const img = new Image();
img.src = currentFrame(elemPos());

canvas.width = setImageWIdth(); // is this the best way?
canvas.height = 220;
// make dynamic
img.onload=function(){
  InitCanvas();
}
function InitCanvas() {
  context.drawImage(img, 0, 0);
}
// update the image on the canvas
const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

// Listen for the scroll event
document.addEventListener( 'scroll', event => {
  scrollListener();
})

function browserResize() {
  canvas.width = setImageWIdth();
  img.src = currentFrame(elemPos());
}

window.onresize = browserResize;
preloadImages();
