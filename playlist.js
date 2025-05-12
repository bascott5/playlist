var bar = document.getElementById("bar");
var back = document.getElementById("back");
var play = document.getElementById("play");
var forward = document.getElementById("forward");

var playlist = [
    {
        cover: "covers/ice-n-dust.png",
        title: "Ice And Dust",
        artist: "Cold Cinema",
        song: "songs/ice-n-dust.mp3"
    },
    {
        cover: "covers/rise-beyond-the-flame.png",
        title: "Rise Beyond The Flames",
        artist: "Elkris",
        song: "songs/rise-beyond-the-flames.mp3"
    },
    {
        cover: "covers/in-dreamland.png",
        title: "In Dreamland",
        artist: "Chillpeach",
        song: "songs/in-dreamland.mp3"
    },
];
var currentSong = 0;
var audio = new Audio();
audio.preload = "metadata";

function updateSong() {
    if (currentSong < playlist.length) {
        audio.src = playlist[currentSong].song;
        audio.load();
        const cover = document.getElementById("cover");
        const title = document.getElementById("title");
        const artist = document.getElementById("artist");

        cover.src = playlist[currentSong].cover;
        title.textContent = playlist[currentSong].title;
        artist.textContent = playlist[currentSong].artist;
        
        play.firstChild.src = "assets/pause.svg";
        play.firstChild.alt = "PAUSE";
        audio.play();

        audio.onloadedmetadata = () => {
            const time = (parseInt(audio.duration) * 1000) + 1000;
            audio.onplaying = () => {
                bar.style.display = "block";
                bar.style.animation = `slide ${time}ms`;
            }

            const duration = setTimeout(() => {
                if (audio.ended) {
                    nextSong();
                }
        
                clearTimeout(duration);
            }, time);
        }
    }
}

function nextSong() {
    if (currentSong < playlist.length - 1) {
        currentSong++;
        bar.style.display = "none";
        updateSong();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateSong();
});

back.addEventListener("click", () => {
    if (currentSong > 0) {
        currentSong--;
        bar.style.display = "none";
        updateSong();
    }
});

play.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        play.firstChild.src = "assets/pause.svg";
        play.firstChild.alt = "PAUSE";
        bar.style.animationPlayState = "running";
    } else {
        audio.pause();
        play.firstChild.src = "assets/play.svg";
        play.firstChild.alt = "PLAY";
        bar.style.animationPlayState = "paused";
    }
});

forward.addEventListener("click", () => nextSong());