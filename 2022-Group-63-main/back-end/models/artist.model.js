//Artist schema as it is defined in our database
const { Schema } = require("mongoose")

module.exports = mongoose => {
    const Artist = mongoose.model(
      'Artist',
      mongoose.Schema(
      {
            id: String,
            name: String,
            songs: [{type: Schema.Types.Mixed, ref: 'SongSummary'}],
            summary: {
                number_of_songs: Number,
                earliest_release: {type: Schema.Types.Mixed, ref: 'SongSummary'},
                latest_release: {type: Schema.Types.Mixed, ref: 'SongSummary'},
                most_popular: {type: Schema.Types.Mixed, ref: 'SongSummary'},
            }
        },
      {
        collection: 'artists'
      },
    )
  )
  return Artist
}