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

window.checkAnswer = function() {
  const input = document.getElementById("answer").value.trim();
  const message = document.getElementById("message");
  const explanation = document.getElementById("explanation");
  const ending = document.getElementById("ending"); // ← まとめブロックを取得

  if (!message) return;

  if (input === "KAGRA" || input === "かぐら" || input === "カグラ") {
    message.style.color = "#00ffcc";
    message.innerText = "🎉 正解！ 緑の線は『KAGRA』だ！";

    // 1.5秒後に解説を表示
    setTimeout(() => {
      explanation.style.display = "block";
      explanation.scrollIntoView({ behavior: "smooth" });

      // さらに2秒後にまとめを表示
      setTimeout(() => {
        if (ending) {
          ending.style.display = "block";
          ending.scrollIntoView({ behavior: "smooth" });
        }
      }, 2000);
    }, 1500);

  } else if (input === "") {
    message.style.color = "#cccccc";
    message.innerText = "答えを入力してください。";
  } else {
    message.style.color = "#ff6666";
    message.innerText = "残念… もう一度考えてみよう。";
  }
};

// === 3段階ヒント ===
window.showHint = function() {
  const hint = document.getElementById("hint");
  const hints = [
    "🔍 ヒント①：緑の線を“ひらがな”でたどってみよう。",
    "🧭 ヒント②：『か → ぐ → ら』……何かの地名みたいだね？",
    "🌌 ヒント③：富山の山奥にある“重力波観測施設”を思い出して。"
  ];

  let step = parseInt(hint.dataset.step || "0");

  if (step < hints.length) {
    hint.innerText = hints[step];
    hint.style.display = "block";
    hint.style.opacity = 1;
    hint.dataset.step = step + 1;
  } else {
    hint.innerText = "💡 これ以上のヒントはないよ。がんばって！";
  }
};

window.showAnswer = function() {
  const message = document.getElementById("message");
  const explanation = document.getElementById("explanation");

  // キッド風セリフを段階的に表示
  const lines = [
    "🎩『フッ……探偵くん、どうやら僕の謎は難しかったようだね。』",
    "🌙『まあいい、月下の奇術師は優しいからね。特別に教えてあげよう。』",
    "💎『緑の線の正体は……“KAGRA（かぐら）”。』"
  ];

  message.style.color = "#66ccff";
  message.innerText = "";
  let index = 0;

  function showNextLine() {
    if (index < lines.length) {
      message.innerText = lines[index];
      index++;
      setTimeout(showNextLine, 2500); // 2.5秒ごとに次のセリフ
    } else {
      explanation.style.display = "block";
      explanation.scrollIntoView({ behavior: "smooth" });
    }
  }

  showNextLine();
};
