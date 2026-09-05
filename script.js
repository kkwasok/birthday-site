const units = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};
const status = document.getElementById("status");
const musicFrame = document.querySelector(".background-audio");
const musicToggle = document.getElementById("music-toggle");
const musicUrl = musicFrame.src;

musicToggle.addEventListener("click", () => {
  // Reloading inside this user action allows playback where autoplay is blocked.
  musicFrame.src = musicUrl;
  musicToggle.textContent = "Background music playing";
});

function getChristmas(now) {
  const year = now.getFullYear();
  const christmas = new Date(year, 11, 25);
  return now >= christmas ? new Date(year + 1, 11, 25) : christmas;
}

function updateCountdown() {
  const now = new Date();
  const target = getChristmas(now);
  const remaining = Math.max(0, target - now);
  const totalSeconds = Math.floor(remaining / 1000);

  const values = {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };

  Object.entries(values).forEach(([name, value]) => {
    units[name].textContent = String(value).padStart(2, "0");
  });
  status.textContent = `Counting down to Christmas ${target.getFullYear()}`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
