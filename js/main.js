// ---- 星アニメーション ----
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let numStars = 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      d: Math.random() * 0.5
    });
  }
}
createStars();

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  moveStars();
  requestAnimationFrame(drawStars);
}

function moveStars() {
  for (let s of stars) {
    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }
}
drawStars();

// ---- 謎ロック機能 ----
document.querySelectorAll(".locked").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    alert("この謎はまだ解放されていません。\nすべての謎を解くと登場します。");
  });
});

