//Song schema as it is defined in our database
const { Schema } = require("mongoose")

module.exports = mongoose => {
    const Song = mongoose.model(
      'Song',
      mongoose.Schema(
      {
            id: String,
            name: String,
            popularity: Number,
            duration_ms: Number,
            artists: [{type: Schema.Types.Mixed, ref:'ArtistSummary'}],
            release_date: String
      },
      {
        collection: 'songs'
      },
    )
  )
  return Song
}