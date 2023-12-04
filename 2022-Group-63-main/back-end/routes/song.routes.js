//Routes for /songs
module.exports = app => {
    const songs = require("../controllers/song.controller.js")
    
    var router = require("express").Router()

    router.get('/name/:name', songs.getSongsByName)

    router.get('/id/:id', songs.getSongById)

    router.put("/id/:id", songs.updateSongById)

    router.get("/" , songs.getMostPopularSongs)

    router.delete("/id/:id", songs.deleteSongById)

    router.post("/", songs.postSong)

    app.use('/songs', router);
}