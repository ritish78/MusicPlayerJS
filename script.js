const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevButton = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextButton = document.getElementById('next');



//Music
const songs = [
    {
        name: 'Cybercity-lofi',
        displayName: 'Cybercity - A Synthwave Mix',
        artist: 'Odysseus'
    },
    {
        name: 'Sakura',
        displayName: 'Sakura Japanese',
        artist: 'Mr_Momo'
    },
    {
        name: 'NeonDreams',
        displayName: 'Neon Dreams [Jazzhop]',
        artist: 'The Jazz Hop Cafe'
    },
    {
        name: 'MidnightCity',
        displayName: 'Midnight City [Chillmix]',
        artist: 'The Jazz Hop Cafe'
    }

];


//All the images are direct link to Lucas Benjamin's photos on unpslash.
//Link to Lucas Benjamin: https://unsplash.com/@aznbokchoy
const imageLinks = [
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1589336628770-b57a36b2d332?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1040&q=80",
    "https://images.unsplash.com/photo-1553196515-4b54a220b472?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1201&q=80",
    "https://images.unsplash.com/photo-1540606962937-e233b089b513?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=960&q=80",
    "https://images.unsplash.com/photo-1519017971383-dc521daec9d6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1189&q=80",
    "https://images.unsplash.com/photo-1514170727284-1dd11fb98a79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
];


//Checking if the music is playing or not
let isPlaying = false;

//Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = imageLinks[Math.floor(Math.random() * imageLinks.length)];

    //Setting up default image if we don't get the image for album cover
    //Picture Credit: BrianSarubbi97
    //Link to BrianSarubbi97: https://pixabay.com/users/briansarubbi97-18796645/
    if (!image.src) {
        image.src = "img/default.jpg";
    }
}

//Current Song
let songIndex = 0;

//Prev Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    console.log(`Now Playing: ${songIndex}`);
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    console.log(`Now Playing: ${songIndex}`);
    loadSong(songs[songIndex]);
    playSong();
}


//Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // console.log(durationEl, currentTime);

        //Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        //console.log(Math.floor(progressPercent));

        progress.style.width = `${progressPercent}%`;

        //To Calculate the duration of the music
        const durationInMinutes = Math.floor(duration / 60);
        let durationLeftInSeconds = Math.floor(duration % 60);
        if (durationLeftInSeconds < 10) {
            durationLeftInSeconds = `0${durationLeftInSeconds}`;
        }
        

        //Delaying swithcing duration to avoid NaN
        if (durationLeftInSeconds) {
            durationEl.textContent = `${durationInMinutes}:${durationLeftInSeconds}`;    
        }
        //console.log(durationEl);


        //To Calculate the current time of the music
        const currentTimeInMinutes = Math.floor(currentTime / 60);
        let currentTimeLeftInSeconds = Math.floor(currentTime % 60);
        if (currentTimeLeftInSeconds < 10) {
            currentTimeLeftInSeconds = `0${currentTimeLeftInSeconds}`;
        }

        currentTimeEl.textContent = `${currentTimeInMinutes}:${currentTimeLeftInSeconds}`;
    }
}


//Setting the progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    
    const {duration} = music;

    music.currentTime = (clickX / width) * duration;
}

// On Window Load
loadSong(songs[songIndex]);

//Event Listener 
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
