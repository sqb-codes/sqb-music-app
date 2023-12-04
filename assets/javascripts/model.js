class Song {
    constructor(id, name, img, singer, url) {
        this.id = id;
        this.name = name;
        this.singer = singer;
        this.s_url = url;
        this.img = img;
        this.selected = false;
    }
}

let playListObject = {
    playList : [],
    addSong : function(id, name, url, img, singer) {
        let obj = new Song(id, name, img, singer, url);
        this.playList.push(obj);
        console.log(this.playList);
    },
    deleteSong : function(song_id) {
        // let songArrToDelete = this.playList.filter(function(obj) {
        //     return obj.id == song_id;
        // });
        // songArrToDelete[0].selected = true;
        // this.playList = this.playList.filter(function(obj) {
        //     return obj.selected == false;
        // });

        this.playList = this.playList.filter(function(obj) {
            return obj.id != song_id;
        });
    },
    searchSong : function() {

    },
    sortSongs : function() {

    }
}