const db = require("../models")
const Song = db.songs
const json2csv = require('json2csv').parse


//function that generates random id for song
function generateId() {
  var id = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 22; i++)
    id += possible.charAt(Math.floor(Math.random() * possible.length));

  return id;
}

//get song by id
exports.getSongById = (req, res) => {
    const id = req.params
    Song.findOne(id,{_id:0}).lean()
    .then(data => {
      if(!data)
            res.status(404).send({message: "Could not find song with id " + id})
        
        if(req.query.type == "csv") {
            data = json2csv(data, Object.keys(data));
            res.set({
              "Content-Type": "text/csv"
            })
            .send(data)
        } else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error retrieving Song with id " + id})
    })
  

    if(res.status == 500)
        res.status(500).send({message: "Internal Server Error"})
}
    
//delete song by id
exports.deleteSongById = (req, res) => {
    const id = req.params
    Song.findOneAndDelete(id)
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Song with Maybe Song was not found!`
          });
        } else res.send({ message: "Song was deleted successfully!" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Song with id=" + id
        });
      });
      if (res.status == 400)
        res.status(400).send({ message: "Request was not well-formed, see error details" });
  };

//update song by id
exports.updateSongById = (req, res) => {
    const id = req.params

    Song.findOneAndUpdate(id, req.body)
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Song with id=${id}. Maybe Song was not found!`
          });
        } else res.send({ message: "Song was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Song with id=" + id
        });
      });
      
  };

//get songs by given name 
exports.getSongsByName = (req, res) => {
    const name = req.params.name
    Song.find ({ name: name
    },{_id:0}).lean()
    .then(data => {
      if(!data)
            res.status(404).send({message: "Could not find any Songs with name " + name})
        
        if(req.query.type == "csv") {
            data = json2csv(data, Object.keys(data));
            res.set({
              "Content-Type": "text/csv"
            })
            .send(data)
        } else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error retrieving Songs with name " + name})
    })
}

//get most popular N songs from a given year limit to M amount per page (We handle M in the front-end)
exports.getMostPopularSongs = (req, res) => {
    const N = parseInt(req.query.N)
    const year = req.query.year
    Song.aggregate([{
      //Match all songs from year
      $match:{
        $expr: {
          $eq: [{$substr:["$release_date",0,4]},year]
        }
      }
    },
    {$sort: {popularity: -1}},
    {$project: {
      _id: 0,
      id: "$id",
      name: "$name",
      popularity: "$popularity",
      duration_ms: "$duration_ms",
      artists: "$artists",
      release_date: "$release_date",
    }},
    {$limit: N},
    ])
    .then(data => {
        if(!data)
            res.status(404).send({message: "Could not find any Songs" })
        
        if(req.query.type == "csv") {
            data = json2csv(data, Object.keys(data));
            res.set({
              "Content-Type": "text/csv"
            })
            .send(data)
        } else {
            res.send(data)
        }
    })
    .catch(err => {
      console.log(err);
        res.status(500).send({message: "Error retrieving Songs"})
    })
}

//post new song
exports.postSong = (req, res) => {
    const id = generateId()
    if(!id) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    } 

    //Create a song
    const song = new Song({
        id: id,
        name: req.body.name,
        popularity: req.body.popularity,
        duration_ms: req.body.duration_ms,
        artists: req.body.artists,
        artists_id: req.body.artists_id,
        release_date: req.body.release_date
    })

    // if song doesnt have correct format return error
    if(!song.name || !song.popularity || !song.duration_ms || !song.artists || !song.release_date) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    
    //release date must be in format YYYY-MM-DD
    if(song.release_date.length != 10 || song.release_date[4] != '-' || song.release_date[7] != '-') {
        res.status(400).send({ message: "Release date must be in format YYYY-MM-DD!" });
        return;
    }

    //if song name isnt string or popularity isnt number or duration isnt number or artists isnt array or artists_id isnt array or release date isnt string return error
    if(typeof song.name != 'string' || typeof song.popularity != 'number' || typeof song.duration_ms != 'number' || !Array.isArray(song.artists) || typeof song.release_date != 'string') {
        res.status(400).send({ message: "Content must follow correct format!" });
        return;
    }

    song.save(song).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Song."
        });
      });
  };
    

