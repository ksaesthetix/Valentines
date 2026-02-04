const noBtn = document.getElementById("no");
    const yesBtn = document.getElementById("yes");
    const card = document.querySelector(".card");
    const noSound = document.getElementById("noSound");
    const yesSound = document.getElementById("yesSound");
    const backgroundMusic = document.getElementById("backgroundMusic");
    const musicToggle = document.getElementById("musicToggle");

    // Auto-play background music with fallback
    backgroundMusic.volume = 0.75; // Set to 30% volume
    backgroundMusic.play().catch(() => {
      // Auto-play might be blocked, user can click toggle
    });

    // Toggle background music
    musicToggle.addEventListener("click", () => {
      if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = "🎵";
      } else {
        backgroundMusic.pause();
        musicToggle.textContent = "🔇";
      }
    });

    noBtn.addEventListener("mouseenter", () => {
      noSound.currentTime = 0;
      noSound.play();

      const cardRect = card.getBoundingClientRect();
      const btnRect = noBtn.getBoundingClientRect();

      const maxX = cardRect.width - btnRect.width - 10;
      const maxY = cardRect.height - btnRect.height - 10;

      noBtn.style.left = Math.random() * maxX + "px";
      noBtn.style.top = Math.random() * maxY + "px";
    });

    yesBtn.addEventListener("click", () => {
      yesSound.play();

      confetti({
        particleCount: 260,
        spread: 120,
        origin: { y: 0.65 }
      });

      setTimeout(() => {
        showModal();
      }, 500);
    });

    // Modal functionality
    const successModal = document.getElementById("successModal");
    const modalClose = document.getElementById("modalClose");
    const closeBtn = document.querySelector(".modal-close");

    function showModal() {
      successModal.classList.add("show");
      document.body.style.overflow = "hidden";
    }

    function hideModal() {
      successModal.classList.remove("show");
      document.body.style.overflow = "auto";
    }

    modalClose.addEventListener("click", hideModal);
    closeBtn.addEventListener("click", hideModal);

    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) {
        hideModal();
      }
    });

    function createHeart() {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = Math.random() > 0.5 ? "❤️" : "💗";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 22 + 14 + "px";
      heart.style.animationDuration = Math.random() * 3 + 4 + "s";
      heart.style.opacity = Math.random() * 0.5 + 0.4;

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 8000);
    }

    setInterval(createHeart, 250);