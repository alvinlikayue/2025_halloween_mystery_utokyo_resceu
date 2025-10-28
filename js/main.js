// === 星アニメーション ===
const canvas = document.getElementById("stars");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5,
    d: Math.random() * 0.5,
  }));

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    for (const s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      s.y += s.d;
      if (s.y > canvas.height) s.y = 0;
    }
    requestAnimationFrame(drawStars);
  }
  drawStars();
}

// === 答えチェック ===
window.checkAnswer = function() {
  const input = document.getElementById("answer").value.trim();
  const message = document.getElementById("message");

  if (!message) return;

  if (input === "KAGRA" || input === "かぐら" || input === "カグラ") {
    message.style.color = "#00ffcc";
    message.innerText = "🎉 正解！ 緑の線は『KAGRA』だ！";
  } else if (input === "") {
    message.style.color = "#cccccc";
    message.innerText = "答えを入力してください。";
  } else {
    message.style.color = "#ff6666";
    message.innerText = "残念… もう一度考えてみよう。";
  }
};

