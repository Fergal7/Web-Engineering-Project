const db = require("../models")
const Artist = db.artists
const json2csv = require('json2csv').parse

//get songs by artist id
exports.getSongsById = (req, res) => {
    const id = req.params
    Artist.findOne(id,{_id:0,songs:1}).lean()
    .then(data => {
        if(req.params.type == "csv") {
            data = json2csv(data, Object.keys(data));
            res.set({
              "Content-Type": "text/csv"
            })
            .send(data)
        } 
        if(!data)
            res.status(404).send({message: "Could not find Artist with id " + id})
        else res.send(data)
    })
    .catch(err => {
        res.status(500).send({message: "Error retrieving Artist with id " + id})
    })
}

//delete all songs stored in artist by id_artist
exports.deleteSongsFromArtist = (req, res) => {
    const id = req.params.id
    Artist.findOneAndUpdate(id, { $set: { songs: [] } }, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Songs from Artist with id=${id}. Maybe Artist was not found!`
            });
        } else {
            res.send({
                message: "Songs were deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Songs from Artist with id=" + id
        });
    });
};

//delete all songs from an artist by artist name
exports.deleteSongsFromArtistByName = (req, res) => {
    const name = req.params.name
    Artist.findOneAndUpdate({name: name}, { $set: { songs: [] } }, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Songs from Artist with name=${name}. Maybe Artist was not found!`
            });
        } else {
            res.send({
                message: "Songs were deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Songs from Artist with name=" + name
        });
    });
};

//get songs by artist name
exports.getSongsByName = (req, res) => {
    const name = req.params
    Artist.findOne(name,{_id:0,songs:1}).lean()
    .then(data => {
        if(!data)
        res.status(404).send({message: "Could not find Artist with name " + name})
    
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
        res.status(500).send({message: "Error retrieving Artist with name " + name})
    })
}

//get artist summary by id
exports.getSummaryById = (req, res) => {
    const id = req.params
    Artist.findOne(id,{_id:0,summary:1}).lean()
    .then(data => {
        if(!data)
        res.status(404).send({message: "Could not find Artist with name " + name})
    
    if(req.query.type == "csv") {
        data = json2csv(data.summary, Object.keys(data));
        res.set({
          "Content-Type": "text/csv"
        })
        .send(data)
    } else {
        res.send(data)
    }
    })
    .catch(err => {
        res.status(500).send({message: "Error retrieving Artist with name " + name})
    })
}

//get artist summary by id
exports.getSummaryByName = (req, res) => {
    const name = req.params
    Artist.findOne(name,{_id:0,summary:1}).lean()
    .then(data => {
        if(!data)
            res.status(404).send({message: "Could not find Artist with name " + name})
        
        if(req.query.type == "csv") {
            data = json2csv(data.summary, Object.keys(data));
            res.set({
              "Content-Type": "text/csv"
            })
            .send(data)
        } else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error retrieving Artist with name " + name})
    })
}
//get most popular N artists from a given year limit to M amount per page (We handle M in the front-end)
exports.getMostPopularArtists = (req, res) => {
    const N = parseInt(req.query.N)
    const year = req.query.year
    Artist.aggregate([
    //Filter all songs from year
    {$project: {
        _id:0,
        id:1,
        name:1,
        songs: {$filter: {
                     input: "$songs",
                     as: "song",
                     cond: {$eq: [{$substr:["$$song.release_date",0,4]},year] }
                  }
        }
      }
    },
    //Sort artists by most popular song from year
    {$sort: {
        "songs.popularity":-1
      }
    },
    {$limit: N},
    {$project: {
        id: "$id",
        name: "$name",
        songs: "$songs",
    }}])
    .then(data => {
        if(!data)
            res.status(404).send({message: "Could not find any artists" })
        
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
        console.log(err)
        res.status(500).send({message: "Error retrieving Songs"})
    })
}