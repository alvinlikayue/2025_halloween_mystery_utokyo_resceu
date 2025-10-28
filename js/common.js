// === 背景の星 ===
(function starfield(){
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.6,
    d: Math.random() * 0.55,
  }));
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); addEventListener("resize", resize);
  (function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    for (const s of stars) {
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      s.y += s.d; if (s.y > canvas.height) s.y = 0;
    }
    requestAnimationFrame(draw);
  })();
})();

// === 汎用ヒントシステム ===
window.showHint = function(hints, id="hint") {
  const hint = document.getElementById(id);
  if (!hint) return;
  let step = parseInt(hint.dataset.step || "0");
  hint.style.display = "block";
  // ✅ HTMLタグ（img, br など）を正しく描画する
  hint.innerHTML = hints[Math.min(step, hints.length - 1)];
  hint.dataset.step = step + 1;
  hint.style.opacity = 1;
};


// === 汎用解説＋まとめ表示 ===
window.revealExplanation = function() {
  const exp = document.getElementById("explanation");
  const end = document.getElementById("ending");
  if (exp && exp.style.display !== "block") {
    exp.style.display = "block";
    setTimeout(() => exp.style.opacity = 1, 50);
    setTimeout(() => {
      if (end) {
        end.style.display = "block";
        setTimeout(() => end.style.opacity = 1, 100);
        end.scrollIntoView({ behavior: "smooth" });
      }
    }, 2000);
  }
};

// === 汎用答え演出（キッド） ===
window.kidReveal = function(lines) {
  const msg = document.getElementById("message");
  if (!msg) return;
  msg.style.color = "#66ccff"; msg.innerText = "";
  let i = 0;
  (function nextLine() {
    if (i < lines.length) {
      msg.innerText = lines[i++];
      setTimeout(nextLine, 2300);
    } else {
      revealExplanation();
    }
  })();
};

