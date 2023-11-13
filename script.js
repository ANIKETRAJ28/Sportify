let play = document.querySelector("#play");
let pause = document.querySelector("#pause");
let left = document.querySelector("#left");
let right = document.querySelector("#right");
let audioControl = document.querySelector(".audioControl");
let songProgressBar = document.querySelector(".songSlider input");
let audioGif = document.querySelectorAll(".songDuration img");
let songList = Array.from(document.querySelectorAll(".songs"));
let playAnimation = document.querySelector(".songplay>img");

let audioElement = new Audio("assets/1.mp3");
audioElement.currentTime;

let songs = [
  {
    songName: "TVARI - Hawaii Vacation",
    filePath: "assets/1.mp3",
    cover: "assets/1.jpg",
  },
  {
    songName: "Vinee heights",
    filePath: "assets/2.mp3",
    cover: "assets/2.jpg",
  },
  {
    songName: "TremoxBeatz - Barberclub [Hip Hop / Rap Instrumental]",
    filePath: "assets/3.mp3",
    cover: "assets/3.webp",
  },
  {
    songName: "Silicon Valley",
    filePath: "assets/4.mp3",
    cover: "assets/4.webp",
  },
  {
    songName: "Dancehall",
    filePath: "assets/5.mp3",
    cover: "assets/5.webp",
  },
  {
    songName: "Jonathan Gaming",
    filePath: "assets/6.mp3",
    cover: "assets/6.jpg",
  },
  {
    songName: "Solaris",
    filePath: "assets/7.mp3",
    cover: "assets/7.webp",
  },
  {
    songName: "Twin Strangers",
    filePath: "assets/8.mp3",
    cover: "assets/8.webp",
  },
  {
    songName: "Ted",
    filePath: "assets/9.mp3",
    cover: "assets/9.webp",
  },
  {
    songName: "Foley",
    filePath: "assets/10.mp3",
    cover: "assets/10.webp",
  },
];

songList.forEach((element, i) => {
  element.querySelector("img").src = songs[i].cover;
  element.querySelector("span").innerText = songs[i].songName;
  element.querySelector("audio").src = songs[i].filePath;
  let audio = element.querySelector("audio");
  audio.addEventListener("loadedmetadata", function () {
    let dur = audio.duration;
    let min = parseInt(dur / 60);
    let sec = parseInt(dur % 60);
    let songLen = `${min}:${sec < 10 ? "0" : ""}${sec}`;
    element.querySelector(".songDuration span").innerText = songLen;
  });
});

songList.forEach((element) => {
  element.querySelector(".play").addEventListener("click", () => {
    songList.forEach((element) => {
      playAnimation.style.display = "block";
      element.querySelector(".play").style.display = "block";
      element.querySelector(".pause").style.display = "none";
    });
    element.querySelector(".play").style.display = "none";
    element.querySelector(".pause").style.display = "block";
  });
});

function setDefault() {
  songList.forEach((element) => {
    playAnimation.style.display = "none";
    element.querySelector(".play").style.display = "block";
    element.querySelector(".pause").style.display = "none";
  });
}

let index;
songList.forEach((element) => {
  element.addEventListener("click", (e) => {
    index = parseInt(e.target.id);
    audioElement.src = `assets/${index}.mp3`;
    audioElement.currentTime = 0;
    playAnimation.style.display = "block";
    audioElement.play();
    pause.style.display = "inline";
    play.style.display = "none";
  });
});

audioControl.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime == 0) {
    audioElement.play();
    playAnimation.style.display = "block";
    play.style.display = "none";
    pause.style.display = "inline";
  } else {
    audioElement.pause();
    playAnimation.style.display = "none";
    pause.style.display = "none";
    play.style.display = "inline";
    setDefault();
  }
});

left.addEventListener("click", () => {
  if (index === undefined) index = 1;
  else if (index === 1) index = 10;
  else index--;
  audioElement.src = `assets/${index}.mp3`;
  console.log(index);
  audioElement.currentTime = 0;
  audioElement.play();
  pause.style.display = "inline";
  play.style.display = "none";
  setDefault();
  playAnimation.style.display = "block";
  songList[index - 1].querySelector(".play").style.display = "none";
  songList[index - 1].querySelector(".pause").style.display = "block";
});

right.addEventListener("click", () => {
  if (index === undefined) index = 1;
  else if (index === 10) index = 1;
  else index++;
  audioElement.src = `assets/${index}.mp3`;
  console.log(index);
  audioElement.currentTime = 0;
  audioElement.play();
  pause.style.display = "inline";
  play.style.display = "none";
  setDefault();
  playAnimation.style.display = "block";
  songList[index - 1].querySelector(".play").style.display = "none";
  songList[index - 1].querySelector(".pause").style.display = "block";
});

audioElement.addEventListener("timeupdate", () => {
  let songTiming = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  songProgressBar.value = songTiming;
});

songProgressBar.addEventListener("change", () => {
  let val = songProgressBar.value;
  audioElement.currentTime = (val * audioElement.duration) / 100;
});
