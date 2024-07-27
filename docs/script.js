function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

locomotive();

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function getImagePath(index) {
  // Pads the index with zeros to match the format "maleXXXX.png"
  const paddedIndex = String(index).padStart(4, '0');
  return `./assets/image/male${paddedIndex}.png`;
}

const frameCount = 300;

const images = [];
const imageSequence = {
  frame: 1,
};

for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = getImagePath(i);
  images.push(img);
}

gsap.to(imageSequence, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.15,
    trigger: "#page",
    start: "top top",
    end: "400% top",
    scroller: "#main",
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSequence.frame], context);
}

function scaleImage(img, ctx) {
  const canvas = ctx.canvas;
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const centerShift_x = (canvas.width - img.width * ratio) / 2;
  const centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}

ScrollTrigger.create({
  trigger: "#page",
  pin: true,
  scroller: "#main",
  start: "top top",
  end: "400% top",
});
