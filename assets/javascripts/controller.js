window.addEventListener("load", initEvents);

var audioPlayer;
var allSongs;

function initEvents() {
    loadJSON();
    loadPlaylist();
}

// function loadJSON() {
//     let xhttp = new XMLHttpRequest();
//     // let url = "assets/javascripts/songs.json";
//     let url = "https://raw.githubusercontent.com/sqb-codes/BennettUniversityFS/main/songs.json";
//     // readystatechange - it's an event
//     xhttp.onreadystatechange = function() {
//         // console.log(`Ready State : ${this.readyState}, Status : ${this.status}`);
//         if(this.readyState == 4 && this.status == 200) {
//             // console.log(this.responseText);
//             allSongs = JSON.parse(this.responseText);
//             loadSongs();
//         }
//     }
//     xhttp.open("GET", url);
//     xhttp.send();
// }

function loadJSON() {
    let url = "https://raw.githubusercontent.com/sqb-codes/BennettUniversityFS/main/songs.json";
    // fetch(url).then().catch()
    fetch(url, {method : "GET"})
    .then(data => data.json())
    .then(result => {
        // console.log(result);
        allSongs = result;
        loadSongs();
    })
    .catch(error => {
        console.log("Failed to load data...");
    });
}

function loadSongs() {
    let songsList = document.querySelector("#songs-list");
    audioPlayer = document.querySelector("#audio");

    allSongs.forEach(function(obj) {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.setAttribute("src",obj.s_img);
        img.className = "w-100";
        let heading = document.createElement("h5");
        heading.innerText = obj.s_name;
        let para = document.createElement("p");
        para.innerText = obj.s_singer;
        let playBtn = document.createElement("button");
        playBtn.innerText = "Play";
        playBtn.className = "btn btn-danger me-4";
        playBtn.setAttribute("title", obj.s_id);
        playBtn.addEventListener("click", playSong);

        let playListBtn = document.createElement("button");
        playListBtn.innerText = "Add to playlist";
        playListBtn.className = "btn btn-primary";
        playListBtn.setAttribute("title", obj.s_id);
        playListBtn.addEventListener("click", addSong);

        li.appendChild(img);
        li.appendChild(heading);
        li.appendChild(para);
        li.appendChild(playBtn);
        li.appendChild(playListBtn);

        songsList.append(li);
    });
}

function playSong() {
    let song_id = this.title;
    let resultArr = allSongs.filter(function(obj) {
        return obj.s_id == song_id;
    });
    let songUrl = resultArr[0].s_url;
    audioPlayer.src = songUrl;
    audioPlayer.play();
    document.querySelector("#current-song").innerText = resultArr[0].s_name;
}

function addSong() {
    let song_id = this.title;
    let resultArr = allSongs.filter(function(obj) {
        return obj.s_id == song_id;
    });

    let arr = playListObject.playList.filter(function(obj) {
        return obj.id == song_id;
    });
    if(arr.length != 0) {
        alert("Song already exists in playlist...");
        return;
    }

    playListObject.addSong(resultArr[0].s_id, resultArr[0].s_name, resultArr[0].s_url,
        resultArr[0].s_img, resultArr[0].s_singer);

    showPlaylist();
    savePlaylist();
}


function showPlaylist() {
    let playList = document.querySelector("#playlist");
    playList.innerHTML = "";
    playListObject.playList.forEach(function(obj) {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.setAttribute("src", obj.img);
        let h5 = document.createElement("h5");
        h5.innerHTML = obj.name + "<br>" + obj.singer;
        // let p = document.createElement("p");
        // p.innerText = obj.singer;
        let playBtn = document.createElement("button");
        playBtn.innerText = "Play";
        playBtn.className = "btn btn-danger me-4";
        playBtn.setAttribute("title", obj.id);
        playBtn.addEventListener("click", playSong);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.className = "btn btn-primary";
        deleteBtn.setAttribute("title", obj.id);
        deleteBtn.addEventListener("click", deleteSong);
        li.appendChild(img);
        li.appendChild(h5);
        // li.appendChild(p);
        li.appendChild(playBtn);
        li.appendChild(deleteBtn);

        playList.appendChild(li);
    });
}

function deleteSong() {
    let song_id = this.title;
    playListObject.deleteSong(song_id);
    showPlaylist();
    savePlaylist();
}

function savePlaylist() {
    if(window.localStorage) {
        // Stringify - convert array of object into string object
        let data = JSON.stringify(playListObject.playList);
        localStorage.setItem("playlist", data);
    }
    else {
        alert("Browser don't support localstorage");
        alert("Playlist cannot be saved..");
    }
}

function loadPlaylist() {
    if(window.localStorage) {
        if(localStorage.playlist) {
            let data = localStorage.getItem("playlist");
            // Parse - Convert String back to array of object
            playListObject.playList = JSON.parse(data);
            showPlaylist();
        }
    }
    else {
        alert("Browser don't support localstorage");
        alert("Playlist cannot be saved..");
    }
}