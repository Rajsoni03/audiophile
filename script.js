const songs = [
    {
        title: "Yaha Waha Tu - v1",
        artist: "Piyush Panday",
        url: "assets/Yaha Waha Tu v1.mp3",
        cover: "https://img.freepik.com/premium-photo/young-couple-sitting-park-bench-sharing-box-chocolates-surrounded-by-hearts_885831-80783.jpg",
    },
    {
        title: "Yaha Waha Tu - v2",
        artist: "Piyush Panday",
        url: "assets/Yaha Waha Tu v2.mp3",
        cover: "https://img.freepik.com/premium-photo/young-couple-sitting-park-bench-sharing-box-chocolates-surrounded-by-hearts_885831-80783.jpg",
    },
    {
        title: "Yaha Waha Tu - v3",
        artist: "Piyush Panday",
        url: "assets/Yaha Waha Tu v3.mp3",
        cover: "https://img.freepik.com/premium-photo/young-couple-sitting-park-bench-sharing-box-chocolates-surrounded-by-hearts_885831-80783.jpg",
    },
    {
        title: "Yaha Waha Tu - v4",
        artist: "Piyush Panday",
        url: "assets/Yaha Waha Tu v4.mp3",
        cover: "https://img.freepik.com/premium-photo/young-couple-sitting-park-bench-sharing-box-chocolates-surrounded-by-hearts_885831-80783.jpg",
    },
];

let currentIndex = 0;
const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const currentTimeEl = document.getElementById("currentTime");
const durationTimeEl = document.getElementById("durationTime");
const progressBar = document.getElementById("progressBar");

function loadSong(index) {
    const song = songs[index];
    audio.src = song.url;
    document.getElementById("songTitle").innerText = song.title;
    document.getElementById("artist").innerText = song.artist;
    document.getElementById("albumCover").src = song.cover;
    audio.load();
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = "<i class='fas fa-pause'></i>";
    } else {
        audio.pause();
        playPauseBtn.innerHTML = "<i class='fas fa-play'></i>";
    }
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playPauseBtn.innerHTML = "<i class='fas fa-pause'></i>";
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playPauseBtn.innerHTML = "<i class='fas fa-play'></i>";
}

function updateTime() {
    const curr = formatTime(audio.currentTime);
    const dur = formatTime(audio.duration);
    currentTimeEl.innerText = curr;
    durationTimeEl.innerText = isNaN(audio.duration) ? "0:00" : dur;

    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function seek(event) {
    const bar = event.currentTarget;
    const width = bar.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function generatePlaylist() {
    const playlistDiv = document.getElementById("playlist");
    songs.forEach((song, i) => {
        const songEl = document.createElement("div");
        songEl.className = "flex border-b py-3 cursor-pointer hover:shadow-md px-2";
        songEl.innerHTML = `
          <img class='w-10 h-10 object-cover rounded-lg' src='images/music-icon.png' />
          <div class="flex flex-col px-3 w-full">
            <span class="text-sm text-blue-500 capitalize font-semibold pt-1">
              ${song.title}
            </span>
            <span class="text-xs text-gray-500 uppercase font-medium">
              - ${song.artist}
            </span>
          </div>
        `;
        songEl.onclick = () => {
            currentIndex = i;
            loadSong(i);
            audio.play();
            playPauseBtn.innerHTML = "<i class='fas fa-pause'></i>";
        };
        playlistDiv.appendChild(songEl);
    });
}

// INIT
audio.addEventListener("timeupdate", updateTime);
audio.addEventListener("ended", nextSong);
loadSong(currentIndex);
generatePlaylist();
