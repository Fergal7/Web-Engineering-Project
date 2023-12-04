module.exports = mongoose => {
    const SongSummary = mongoose.model(
      'SongSummary',
      mongoose.Schema(
      {
            id: String,
            name: String,
            popularity: Number,
            release_date: String
      },
    )
  )
  return SongSummary
}