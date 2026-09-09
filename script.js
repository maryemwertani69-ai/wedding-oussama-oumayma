const loader =
  document.getElementById("loader");

const music =
  document.getElementById("weddingMusic");

const musicBtn =
  document.getElementById("musicBtn");

const welcomeModal =
  document.getElementById("welcomeModal");

let musicPlaying = false;
let fadeInterval = null;


// ==========================================
// TOUJOURS COMMENCER EN HAUT
// ==========================================

if ("scrollRestoration" in history) {

  history.scrollRestoration =
    "manual";

}


window.addEventListener(
  "load",
  () => {

    window.scrollTo(0, 0);

    setTimeout(() => {

      if (loader) {

        loader.classList.add(
          "hidden"
        );

      }

    }, 800);

  }
);


window.addEventListener(
  "pageshow",
  () => {

    window.scrollTo(0, 0);

  }
);


// ==========================================
// ENTRER AVEC MUSIQUE
// ==========================================

function enterInvitation() {

  window.scrollTo(0, 0);


  if (!welcomeModal) return;


  welcomeModal.classList.add(
    "open"
  );


  if (music) {

    music.volume = 0;


    music.play()

      .then(() => {

        musicPlaying = true;


        if (musicBtn) {

          musicBtn.classList.add(
            "playing"
          );

        }


        fadeMusicIn();

      })

      .catch(
        error => {

          console.log(
            "Erreur musique :",
            error
          );

        }
      );

  }


  setTimeout(() => {

    welcomeModal.classList.add(
      "hide"
    );

  }, 1500);


  setTimeout(() => {

    welcomeModal.style.display =
      "none";

    window.scrollTo(0, 0);

  }, 2400);

}


// ==========================================
// ENTRER SANS MUSIQUE
// ==========================================

function enterWithoutMusic() {

  window.scrollTo(0, 0);


  if (!welcomeModal) return;


  welcomeModal.classList.add(
    "open"
  );


  if (music) {

    music.pause();

    music.currentTime = 0;

  }


  musicPlaying = false;


  if (musicBtn) {

    musicBtn.classList.remove(
      "playing"
    );

  }


  setTimeout(() => {

    welcomeModal.classList.add(
      "hide"
    );

  }, 1500);


  setTimeout(() => {

    welcomeModal.style.display =
      "none";

    window.scrollTo(0, 0);

  }, 2400);

}


// ==========================================
// FADE MUSIQUE
// ==========================================

function fadeMusicIn() {

  if (!music) return;


  if (fadeInterval) {

    clearInterval(
      fadeInterval
    );

  }


  let volume = 0;


  fadeInterval =
    setInterval(() => {


      volume += .02;


      if (volume >= .5) {

        volume = .5;

        clearInterval(
          fadeInterval
        );

        fadeInterval = null;

      }


      music.volume =
        volume;


    }, 70);

}


// ==========================================
// MUSIC BUTTON
// ==========================================

if (musicBtn && music) {

  musicBtn.addEventListener(
    "click",
    () => {


      if (!music.paused) {

        music.pause();

        return;

      }


      music.volume = .5;


      music.play()
        .catch(
          error =>
            console.log(error)
        );

    }
  );

}


if (music) {

  music.addEventListener(
    "play",
    () => {

      musicPlaying = true;


      if (musicBtn) {

        musicBtn.classList.add(
          "playing"
        );

      }

    }
  );


  music.addEventListener(
    "pause",
    () => {

      musicPlaying = false;


      if (musicBtn) {

        musicBtn.classList.remove(
          "playing"
        );

      }

    }
  );

}


// ==========================================
// SCROLL EVENTS
// ==========================================

function scrollToInvitation() {

  const invitation =
    document.getElementById(
      "invitation"
    );


  if (invitation) {

    invitation.scrollIntoView({

      behavior: "smooth",

      block: "start"

    });

  }

}


// ==========================================
// COUNTDOWN
// ==========================================

const weddingDate =
  new Date(
    "2026-09-28T19:00:00+01:00"
  ).getTime();


function updateCountdown() {

  const distance =
    weddingDate - Date.now();


  if (distance <= 0) {

    const countdown =
      document.getElementById(
        "countdown"
      );


    if (countdown) {

      countdown.innerHTML =
        `
          <div
            style="
              font-family:'Great Vibes';
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
    Math.floor(
      distance /
      86400000
    );


  const hours =
    Math.floor(
      (
        distance %
        86400000
      ) /
      3600000
    );


  const minutes =
    Math.floor(
      (
        distance %
        3600000
      ) /
      60000
    );


  const seconds =
    Math.floor(
      (
        distance %
        60000
      ) /
      1000
    );


  setValue(
    "days",
    days
  );

  setValue(
    "hours",
    hours
  );

  setValue(
    "minutes",
    minutes
  );

  setValue(
    "seconds",
    seconds
  );

}


function setValue(
  id,
  value
) {

  const element =
    document.getElementById(id);


  if (element) {

    element.textContent =
      String(value)
        .padStart(
          2,
          "0"
        );

  }

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


// ==========================================
// SCROLL REVEAL
// ==========================================

const revealElements =
  document.querySelectorAll(
    ".reveal-section"
  );


const observer =
  new IntersectionObserver(

    entries => {


      entries.forEach(
        entry => {


          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add(
                "visible"
              );


            observer.unobserve(
              entry.target
            );

          }

        }
      );

    },

    {

      threshold: .12,

      rootMargin:
        "0px 0px -40px 0px"

    }

  );


revealElements.forEach(
  element => {

    observer.observe(
      element
    );

  }
);


// ==========================================
// PARTICULES
// ==========================================

function createParticle() {

  const container =
    document.getElementById(
      "particles"
    );


  if (!container) return;


  const particle =
    document.createElement(
      "span"
    );


  const symbols =
    [
      "✦",
      "✧",
      "•",
      "♡"
    ];


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
    Math.random() *
    100 +
    "vw";


  particle.style.fontSize =
    (
      Math.random() *
      6 +
      5
    ) +
    "px";


  particle.style.animationDuration =
    (
      Math.random() *
      7 +
      10
    ) +
    "s";


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
// MAP
// ==========================================

function openMap(
  event,
  address
) {

  event.preventDefault();


  const url =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      address
    );


  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}