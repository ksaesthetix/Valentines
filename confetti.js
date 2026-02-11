// Lightweight DOM-based confetti fallback (no CDN required)
// Usage: confetti({ particleCount, spread, origin })
(function () {
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function confetti(opts = {}) {
    const particleCount = opts.particleCount || 100;
    const origin = opts.origin || { x: 0.5, y: 0.5 };
    const colors = ["#ff6b6b", "#ff9f43", "#ffdd57", "#48dbfb", "#a29bfe"];
    const emojis = ["💘","❤️","💖","💗","💕"];

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'local-confetti-particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const size = Math.floor(random(12, 28));
      p.style.position = 'fixed';
      p.style.left = (origin.x * window.innerWidth) + 'px';
      p.style.top = (origin.y * window.innerHeight) + 'px';
      p.style.fontSize = size + 'px';
      p.style.pointerEvents = 'none';
      p.style.zIndex = 9999;
      p.style.opacity = '1';
      p.style.transform = `translate(-50%, -50%) rotate(${random(0,360)}deg)`;

      document.body.appendChild(p);

      // animate
      const angle = random(-Math.PI, Math.PI);
      const velocity = random(80, 420);
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity * -1;
      const duration = random(900, 2000);

      p.animate([
        { transform: p.style.transform, opacity: 1 },
        { transform: `translate(${vx}px, ${vy}px) rotate(${random(360,720)}deg)`, opacity: 0 }
      ], {
        duration: duration,
        easing: 'cubic-bezier(.16,.84,.44,1)'
      });

      setTimeout(() => p.remove(), duration + 100);
    }
  }

  // expose globally
  window.confetti = confetti;
})();
