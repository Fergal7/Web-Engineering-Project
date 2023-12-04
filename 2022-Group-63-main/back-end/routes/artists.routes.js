//Routes for /artists
module.exports = app => {
    const artists = require("../controllers/artist.controller.js")

    var router = require("express").Router()

    router.get('/songs/id/:id', artists.getSongsById) 

    router.delete('/songs/id/:id', artists.deleteSongsFromArtist)

    router.get('/songs/name/:name', artists.getSongsByName) 

    router.delete('/songs/name/:name', artists.deleteSongsFromArtistByName)

    router.get('/summary/id/:id', artists.getSummaryById)

    router.get('/summary/name/:name', artists.getSummaryByName)

    router.get("/", artists.getMostPopularArtists)

    app.use('/artists', router);

}