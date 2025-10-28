// 星が少し動く演出
const stars = document.querySelector('.stars');
let move = 0;
setInterval(() => {
  move += 1;
  stars.style.backgroundPosition = `${move}px ${move}px`;
}, 50);

// ロック機能（例：puzzle7 は開かない）
document.querySelectorAll('.locked').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    alert("この謎はまだ解放されていません。全ての謎を解くと現れます！");
  });
});

