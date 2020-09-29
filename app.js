let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playlist = document.getElementById("playlist")
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let text = ""
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement("audio");
curr_track.setAttribute("type", "audio/mp3");
// Define the tracks that have to be played
let track_list = [
  {
    name: "Better with You",
    artist: "3LAU",
    image:
      "https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/9b/0c/a2/9b0ca2bc-dd80-5f79-1fa7-2be70cc4dfad/source/1200x1200bb.jpg",
    path:
      "./songs/3LAU - Better With You (Lyrics) feat. Iselin, With Justin Caruso.m4a",
  },
  {
    name: "Good Vibe",
    artist: "BRKLYN ft Zack Martino",
    image: "https://cdn.pixabay.com/photo/2018/05/24/11/51/pineapple-3426460__340.jpg",
    path: "./songs/BRKLYN - Good Vibe (Lyrics) ft. Zack Martino.m4a",
  },
  {
    name: "Angels",
    artist: "Owl City",
    image: "https://cdn.pixabay.com/photo/2015/05/02/08/02/angel-749625__340.jpg",
    path: "./songs/Owl_City_Angels.mp3",
  },
  {
    name: "Denied Again",
    artist: "Aspyer",
    image: "https://cdn.pixabay.com/photo/2020/04/14/18/25/no-access-5043758__340.jpg",
    path: "./songs/Aspyer - Denied Again (Lyrics - Lyric Video).m4a",
  },
  {
    name: "Galaxies",
    artist: "Owl City",
    image: "https://cdn.pixabay.com/photo/2015/11/04/20/59/milky-way-1023340__340.jpg",
    path: "./songs/Owl_City_Galaxies.mp3",
  },
  {
    name: "All the lies",
    artist: "Alok, Felix Jaeh ft The Vamps",
    image: "https://cdn.pixabay.com/photo/2017/08/07/12/49/people-2603521__340.jpg",
    path: "./songs/Alok, Felix Jaehn & The Vamps - All The Lies (Lyrics).m4a",
  },
  {
    name: "Gold",
    artist: "Owl City",
    image: "https://cdn.pixabay.com/photo/2014/11/01/22/33/gold-513062__340.jpg",
    path: "./songs/owl_city_gold_official_music_video_mp3_61240.mp3",
  },
  {
    name: "I Said Hi",
    artist: "Amy Shark",
    image: "",
    path: "./songs/Amy Shark - I Said Hi (Lyrics - Lyrics).m4a",
  },

  {
    name: "Sleepless Nights",
    artist: "Ayokay ft Nightly",
    image: "https://cdn.pixabay.com/photo/2017/06/08/07/25/bear-2382779__340.jpg",
    path: "./songs/ayokay - Sleepless Nights (Lyrics) ft. Nightly.m4a",
  },
  {
    name: "That Feeling",
    artist: "Dagny",
    image: "https://cdn.pixabay.com/photo/2016/11/01/03/27/girl-1787357__340.jpg",
    path: "./songs/Dagny - That Feeling When (Lyrics - Lyrics Video).m4a",
  },
  {
    name: "Love me",
    artist: "Felix Cartal $ Lights",
    image: "",
    path: "./songs/Felix Cartal & Lights - Love Me (Lyrics).m4a",
  },
  {
    name: "IDK Single",
    artist: "Loote",
    image: "",
    path: "./songs/Loote - IDK Single (Lyrics).m4a",
  },
  {
    name: "No Good",
    artist: "Pia Mia",
    image: "",
    path: "./songs/Pia Mia - No Good (Lyrics - Lyrics Video).m4a",
  },
  {
    name: "Fences",
    artist: "Vicetone",
    image: "https://cdn.pixabay.com/photo/2014/11/17/20/55/girl-535251__340.jpg",
    path: "./songs/Vicetone - Fences (Lyrics) feat. Matt Wertz.m4a",
  },
  {
    name: "Don't call me",
    artist: "Nevada & Loote",
    image: "",
    path: "./songs/Nevada & Loote - Don't Call Me (Lyrics).m4a",
  },
  {
    name: "Blue in my Eyes",
    artist: "NLSN",
    image: "https://cdn.pixabay.com/photo/2014/01/02/04/14/blue-eyes-237438__340.jpg",
    path:
      "./songs/NLSN - Blue In My Eyes (Lyrics - Lyric Video) feat. Lisa Rowe.m4a",
  },
  {
    name: "Wanted",
    artist: "NOTD & Daya",
    image: "",
    path: "./songs/Nevada & Loote - Don't Call Me (Lyrics).m4a",
  },
  {
    name: "Exposed",
    artist: "Apek ft April Bender",
    image: "https://cdn.pixabay.com/photo/2017/08/06/18/29/woman-2594934__340.jpg",
    path: "./songs/APEK - Exposed (Official Music Video) ft. April Bender.m4a",
  },
  {
    name: "Motion",
    artist: "Sam Smyers",
    image: "https://cdn.pixabay.com/photo/2016/10/22/03/35/water-1759703__340.jpg",
    path: "./songs/Sam Smyers - Motion (feat. M. Maggie).m4a",
  },
  {
    name: "Hate me",
    artist: "Ellie Goulding, Juice WRLD",
    image: "https://cdn.pixabay.com/photo/2017/01/30/02/19/no-hate-2019922__340.jpg",
    path: "./songs/Ellie Goulding, Juice WRLD - Hate Me.m4a",
  },
  {
    name: "Don't",
    artist: "Pilton ft Gus",
    image: "https://m.media-amazon.com/images/I/91O1VczOOIL._SS500_.jpg",
    path: "./songs/Pilton - Don't (Official Lyric Video) ft. Gus.m4a",
  },
  {
    name: "Stay",
    artist: "Nicky Romero",
    image: "https://m.media-amazon.com/images/I/514BDBiZPxL._SS500_.jpg",
    path: "./songs/Nicky Romero - Stay (Lyrics).m4a",
  },
];
function imgBg() {
  track_art.style.backgroundImage = ""
  if (!track_list[track_index].image) {
    return track_art.style.backgroundImage = `url("https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg")`
  } else {
    track_art.style.backgroundImage =
      "url(" + track_list[track_index].image + ")";
      playList()
      playlist.innerHTML = text;
  }
}
function playList(){
  text = ""
  track_list.forEach((song, index) => text += `
  <div class ="list ${track_index === index ? "playing" : ""} id="song${index}"" onclick="loadPlayTrack(${index})")>
   <div class= "song">${index + 1}. ${song.name}</div>
   <div class="artist ${track_index === index ? "playing" : ""}">${song.artist}</div> 
  </div>` )
}
 function loadPlayTrack(index){
   track_index = index
  loadTrack(index)
  console.log(index)
  console.log(track_index)
  playTrack()
  playList()
}
function random_bg_color() {
  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}
function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;

  curr_track.load();
  imgBg();
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
