module.exports = mongoose => {
    const ArtistSummary = mongoose.model(
      'ArtistSummary',
      mongoose.Schema(
      {
            id: String,
            name: String,
      },
    )
  )
  return ArtistSummary
}