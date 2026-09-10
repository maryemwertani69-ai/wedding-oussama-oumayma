const loader = document.getElementById("loader");
const music = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");
const welcomeModal = document.getElementById("welcomeModal");

let fadeInterval = null;


// ==========================================
// LOAD
// ==========================================

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);

  setTimeout(() => {
    if (loader) {
      loader.classList.add("hidden");
    }
  }, 800);
});


// ==========================================
// OPEN INVITATION
// ==========================================

function openLuxuryCard() {

  const intro =
    document.getElementById("welcomeModal");

  if (
    !intro ||
    intro.classList.contains("opening")
  ) {
    return;
  }

  window.scrollTo(0, 0);

  intro.classList.add("opening");


  // Musique démarre grâce au clic utilisateur
  if (music) {

    music.volume = 0;

    music.play()
      .then(() => {

        if (musicBtn) {
          musicBtn.classList.add("playing");
        }

        fadeMusicIn();

      })
      .catch(error => {
        console.log("Musique :", error);
      });

  }


  // La carte reste visible assez longtemps
  setTimeout(() => {
    intro.classList.add("hide");
  }, 1650);


  setTimeout(() => {
    intro.style.display = "none";
    window.scrollTo(0, 0);
  }, 2300);

}

window.openLuxuryCard = openLuxuryCard;


// ==========================================
// MUSIC FADE
// ==========================================

function fadeMusicIn() {

  if (!music) return;

  if (fadeInterval) {
    clearInterval(fadeInterval);
  }

  let volume = 0;

  fadeInterval = setInterval(() => {

    volume += 0.02;

    if (volume >= 0.5) {
      volume = 0.5;

      clearInterval(fadeInterval);
      fadeInterval = null;
    }

    music.volume = volume;

  }, 70);

}


// ==========================================
// MUSIC BUTTON
// ==========================================

if (musicBtn && music) {

  musicBtn.addEventListener("click", () => {

    if (!music.paused) {

      music.pause();
      musicBtn.classList.remove("playing");

    } else {

      music.volume = 0.5;

      music.play()
        .then(() => {
          musicBtn.classList.add("playing");
        })
        .catch(error => {
          console.log("Music error :", error);
        });

    }

  });

}


// ==========================================
// SCROLL TO EVENTS
// ==========================================

function scrollToInvitation() {

  const invitation =
    document.getElementById("invitation");

  if (invitation) {

    invitation.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}

window.scrollToInvitation = scrollToInvitation;


// ==========================================
// COUNTDOWN — MARIAGE 09H00
// ==========================================

const weddingDate =
  new Date("2026-09-28T09:00:00+01:00").getTime();

function updateCountdown() {

  const distance =
    weddingDate - Date.now();

  if (distance <= 0) {

    const countdown =
      document.getElementById("countdown");

    if (countdown) {

      countdown.innerHTML = `
        <div
          style="
            font-family:'Great Vibes',cursive;
            font-size:55px;
            color:#dfc792;
          "
        >
          C'est notre grand jour ♡
        </div>
      `;

    }

    return;
  }

  const days =
    Math.floor(distance / 86400000);

  const hours =
    Math.floor(
      (distance % 86400000) /
      3600000
    );

  const minutes =
    Math.floor(
      (distance % 3600000) /
      60000
    );

  const seconds =
    Math.floor(
      (distance % 60000) /
      1000
    );

  setCountdownValue("days", days);
  setCountdownValue("hours", hours);
  setCountdownValue("minutes", minutes);
  setCountdownValue("seconds", seconds);

}

function setCountdownValue(id, value) {

  const element =
    document.getElementById(id);

  if (element) {

    element.textContent =
      String(value).padStart(2, "0");

  }

}

updateCountdown();

setInterval(
  updateCountdown,
  1000
);


// ==========================================
// REVEAL ON SCROLL
// ==========================================

const revealElements =
  document.querySelectorAll(".reveal-section");

if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target
              .classList
              .add("visible");

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }

    );

  revealElements.forEach(element => {
    observer.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add("visible");
  });

}


// ==========================================
// PARTICLES
// ==========================================

function createParticle() {

  const container =
    document.getElementById("particles");

  if (!container) return;

  const particle =
    document.createElement("span");

  const symbols =
    ["✦", "✧", "•", "♡"];

  particle.className =
    "particle";

  particle.textContent =
    symbols[
      Math.floor(
        Math.random() *
        symbols.length
      )
    ];

  particle.style.left =
    Math.random() * 100 + "vw";

  particle.style.fontSize =
    (Math.random() * 6 + 5) + "px";

  particle.style.animationDuration =
    (Math.random() * 7 + 10) + "s";

  container.appendChild(
    particle
  );

  setTimeout(
    () => particle.remove(),
    18000
  );

}

setInterval(
  createParticle,
  1300
);


// ==========================================
// GOOGLE MAP
// ==========================================

function openMap(event, address) {

  event.preventDefault();

  const url =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(address);

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}

window.openMap = openMap;
