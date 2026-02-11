const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const card = document.querySelector(".card");
const noSound = document.getElementById("noSound");
const yesSound = document.getElementById("yesSound");
const backgroundMusic = document.getElementById("backgroundMusic");

// Flag to track if music has started
let musicStarted = false;

// Function to start background music on first interaction
function startBackgroundMusic() {
  if (!musicStarted) {
    backgroundMusic.volume = 0.75;
    backgroundMusic.play().then(() => {
      console.log("Music started!");
    }).catch(error => {
      console.log("Could not play audio:", error);
    });
    musicStarted = true;
    // Remove the listeners once music has started
    document.removeEventListener("click", startBackgroundMusic);
    document.removeEventListener("mousemove", startBackgroundMusic);
  }
}

// Add event listeners for first interaction
// Start music only on clear user gestures. Some browsers do not
// treat mousemove as a user gesture for audio autoplay permission.
document.addEventListener("click", startBackgroundMusic);
document.addEventListener("touchstart", startBackgroundMusic);
document.addEventListener("keydown", startBackgroundMusic);

noBtn.addEventListener("mouseenter", () => {
  // Only play sound if the user already interacted (permission granted)
  if (musicStarted) {
    try {
      noSound.currentTime = 0;
      noSound.play();
    } catch (e) {
      // ignore play errors when not allowed
      console.log('noSound play prevented:', e);
    }
  }

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

// Music time display
const musicTime = document.getElementById("musicTime");
if (musicTime) {
  backgroundMusic.addEventListener("timeupdate", () => {
    const minutes = Math.floor(backgroundMusic.currentTime / 60);
    const seconds = Math.floor(backgroundMusic.currentTime % 60);
    musicTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  });
}