const play = document.querySelector("#play");
const stopbtn = document.querySelector("#stop");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const unmute = document.querySelector("#unmute");
const mute = document.querySelector("#mute");
const fullscreen = document.querySelector("#fullscreen");
const video = document.querySelector("#video");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector(".progress-container");
const container = document.querySelector(".video-wrapper");
video.addEventListener("click", playPause);
function playPause() {
  if (video.paused) {
    video.play();
    play.style.display = "none";
    stopbtn.style.display = "block";
  } else {
    video.pause();
    play.style.display = "block";
    stopbtn.style.display = "none";
  }
}

function muteToggle() {
  if (video.muted) {
    video.muted = false;
    mute.style.display = "none";
    unmute.style.display = "block";
  } else {
    video.muted = true;
    mute.style.display = "block";
    unmute.style.display = "none";
  }
}

fullscreen.addEventListener("click", () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
});

function render() {
  video.ontimeupdate = function () {
    if (video.duration) {
      const progressPercent = Math.floor(
        (video.currentTime / video.duration) * 100
      );
      updateProgressBarBackground(progressPercent);
      progress.style.width = `${progressPercent}%`;
    }
  };
  let isDragging = false;
  progressContainer.onmousedown = function (e) {
    isDragging = true;
    updateProgress(e);
  };
  progressContainer.onmousemove = function (e) {
    if (isDragging) {
      updateProgress(e);
    }
  };
  progressContainer.onmouseup = function () {
    isDragging = false;
  };
  progressContainer.onmouseleave = function () {
    isDragging = false;
  };
  function updateProgress(e) {
    const containerWidth = progressContainer.offsetWidth;
    const clickX = e.offsetX;
    const newTime = (clickX / containerWidth) * video.duration;
    video.currentTime = newTime;
    const progressPercent = Math.floor((newTime / video.duration) * 100);
    updateProgressBarBackground(progressPercent);
    progress.style.width = `${progressPercent}%`;
  }
}
function updateProgressBarBackground(progressPercent) {
  progressContainer.style.background = `linear-gradient(to right, #ACA9BB ${progressPercent}%, #e0e0e0 ${progressPercent}%)`;
}
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function displayCurrentTime() {
  const currentTimeElement = document.querySelector(".time");
  const totalTimeElement = document.querySelector(".time");

  if (video.duration) {
    const currentTimeFormatted = formatTime(video.currentTime);
    const totalTimeFormatted = formatTime(video.duration);
    currentTimeElement.textContent = `${currentTimeFormatted}/${totalTimeFormatted}`;
  }
}

function skipTime(seconds) {
  video.currentTime += seconds;
}
document.getElementById("prev").addEventListener("click", function () {
  skipTime(-15);
});

document.getElementById("next").addEventListener("click", function () {
  skipTime(15);
});

const end = document.querySelector(".end");

video.addEventListener("play", () => {
  setTimeout(() => {
    end.style.opacity = "0";
  }, 5000);
});
video.addEventListener("mouseenter", () => {
  end.style.opacity = "1";
});
//
video.addEventListener("pause", () => {
  end.style.opacity = "1";
});

const playButton = document.getElementById("playButton");

video.addEventListener("pause", () => {
  playButton.style.display = "flex"; // Hiện nút
});

video.addEventListener("play", () => {
  playButton.style.display = "none"; // Ẩn nút
});

playButton.addEventListener("click", () => {
  video.play(); // Phát video
  playButton.style.display = "none"; // Ẩn nút khi phát
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();
    playPause();
  }

  if (event.code === "ArrowLeft") {
    skipTime(-15);
  } else if (event.code === "ArrowRight") {
    skipTime(15);
  }
});

function skipTime(seconds) {
  const newTime = video.currentTime + seconds;
  video.currentTime = Math.max(0, Math.min(newTime, video.duration));
}

video.addEventListener("timeupdate", displayCurrentTime);
video.addEventListener("loadedmetadata", displayCurrentTime);
render();
play.addEventListener("click", playPause);
stopbtn.addEventListener("click", playPause);
mute.addEventListener("click", muteToggle);
unmute.addEventListener("click", muteToggle);
