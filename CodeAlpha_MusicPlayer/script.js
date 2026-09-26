// Interactive Web Music Player Logic

document.addEventListener("DOMContentLoaded", () => {
  // DOM Element References
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play");
  const playIcon = document.getElementById("play-icon");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const cover = document.getElementById("cover");
  const progressContainer = document.getElementById("progress-container");
  const progressBar = document.getElementById("progress");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  const volumeSlider = document.getElementById("volume-slider");
  const volumeIcon = document.getElementById("volume-icon");
  const playlistEl = document.getElementById("playlist");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Royalty-Free Audio Tracks List
  const songs = [
    {
      name: "neon-horizon",
      title: "Neon Horizon",
      artist: "Synthwave Dreams",
      cover:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      name: "cyber-pulse",
      title: "Cyber Pulse",
      artist: "Retro Beats",
      cover:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      name: "midnight-chill",
      title: "Midnight Chill",
      artist: "Lofi Ambient",
      cover:
        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=500&auto=format&fit=crop",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ];

  let songIndex = 0;
  let isPlaying = false;

  // Initialize App
  loadSong(songs[songIndex]);
  renderPlaylist();
  initTheme();

  // ----------------------------------------------------
  // Audio Player Functions
  // ----------------------------------------------------
  function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
    progressBar.style.width = "0%";
    currentTimeEl.innerText = "0:00";
    durationEl.innerText = "0:00";
    updatePlaylistActiveState();
  }

  function playSong() {
    isPlaying = true;
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
    cover.classList.add("playing");
    audio
      .play()
      .catch((err) => console.log("Autoplay prevented or network error:", err));
  }

  function pauseSong() {
    isPlaying = false;
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    cover.classList.remove("playing");
    audio.pause();
  }

  function prevSong() {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
  }

  function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
  }

  // Update Track Duration as soon as Metadata loads
  function updateDuration() {
    const duration = audio.duration;
    if (!isNaN(duration)) {
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
      durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
    }
  }

  // Real-time Progress Bar & Timer Updates
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (isNaN(duration) || duration === 0) return;

    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Calculate Minutes and Seconds
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;
  }

  // Seek/Scrub Audio on Progress Bar Click
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (!isNaN(duration)) {
      audio.currentTime = (clickX / width) * duration;
    }
  }

  // Set Volume
  function setVolume(e) {
    const volumeVal = parseFloat(e.target.value);
    audio.volume = volumeVal;

    if (volumeVal === 0) {
      volumeIcon.className = "fas fa-volume-xmark";
    } else if (volumeVal < 0.5) {
      volumeIcon.className = "fas fa-volume-low";
    } else {
      volumeIcon.className = "fas fa-volume-high";
    }
  }

  // ----------------------------------------------------
  // Playlist Functions
  // ----------------------------------------------------
  function renderPlaylist() {
    playlistEl.innerHTML = "";
    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <span>${song.title}</span>
                <span>${song.artist}</span>
            `;
      li.addEventListener("click", () => {
        songIndex = index;
        loadSong(songs[songIndex]);
        playSong();
      });
      playlistEl.appendChild(li);
    });
    updatePlaylistActiveState();
  }

  function updatePlaylistActiveState() {
    const playlistItems = playlistEl.querySelectorAll("li");
    playlistItems.forEach((item, index) => {
      if (index === songIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // ----------------------------------------------------
  // Dark / Light Theme Toggle Functions
  // ----------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem("musicPlayerTheme") || "dark";
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      document.body.classList.remove("light-theme");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }

  function toggleTheme() {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");

    if (isLight) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("musicPlayerTheme", "light");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("musicPlayerTheme", "dark");
    }
  }

  // ----------------------------------------------------
  // Event Listeners
  // ----------------------------------------------------
  playBtn.addEventListener("click", () =>
    isPlaying ? pauseSong() : playSong(),
  );
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  audio.addEventListener("loadedmetadata", updateDuration);
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", nextSong);
  progressContainer.addEventListener("click", setProgress);
  volumeSlider.addEventListener("input", setVolume);
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }
});
