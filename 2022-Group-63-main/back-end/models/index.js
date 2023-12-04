const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = "mongodb+srv://Tobian:Tobian@clusterm0.jwonjek.mongodb.net/spotify-search?retryWrites=true&w=majority"
db.songs = require("./song.model.js")(mongoose)
db.artists = require("./artist.model.js")(mongoose)

module.exports = db
