import React, {useState} from 'react';
import axios from 'axios';
import "./popular.component.css"

//Most popular component that has all the methods to get most popular songs and artists
const Popular = () => {

  const[songList, setSongList] = useState([]);
  const[artistList, setArtistList] = useState([]);
  const[N, setN] = useState('');
  const[year, setYear] = useState("2021");
  const[M, setM] = useState(10);
  const[request, setRequest] = useState("songs");
  const [currentPage, setCurrentPage] = useState(1);

  //Checks if it should return songs or artists
  const handleInput = (event) => {
    event.preventDefault();
    if(N > 0) {
      if(request === "songs") {
        getMostPopularSongs();
      } else {
        getMostPopularArtists();
      }
    }
  }

  const getMostPopularSongs = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/songs?N=${N}&year=${year}`);
      setArtistList([]);
      setSongList(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  const getMostPopularArtists = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/artists?N=${N}&year=${year}`);
      setSongList([]);
      setArtistList(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  //Two methods for the pagination of our list
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const Pagination = ({ currentPage, totalPages, handlePageChange }) => (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)}>
          Prev
        </button>
      )}
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      {currentPage < totalPages && (
        <button onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      )}
    </div>
  );

  return (
    <div class = "center">
      <h1> Most Popular Songs/Artists </h1>
    <form onSubmit={handleInput}>
    <input
      type="text"
      value={N}
      onChange={(event) => setN(event.target.value)}
      placeholder="Number of songs"
    />
    <button type="submit">Search</button>
    <select 
      type="text"
      value={year}
      onChange={(event) => setYear(event.target.value)}>
      <option value="2017">2017</option>
      <option value="2018">2018</option>
      <option value="2019">2019</option>
      <option value="2020">2020</option>
      <option value="2021">2021</option>
      <option value="2022">2022</option>
    </select>
    <select 
      type="number"
      value={M}
      onChange={(event) => setM(event.target.value)}>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
    <select 
      type="text"
      value={request}
      onChange={(event) => setRequest(event.target.value)}>
      <option value="songs">Songs</option>
      <option value="artists">Artists</option>
    </select>
    {songList && (
      <div>
        <ol start={(currentPage-1)*M+1}>
      {songList.slice((currentPage - 1) * M, currentPage * M).map((song) => (
        <li class="liPopular" key = {song.id}> 
          <p> ID: {song.id} </p>
          <p> Name: {song.name} </p>
          <p> Popularity: {song.popularity} </p>
          <p> Duration: {song.duration_ms} </p>
          <p> Artists: 
          {song.artists.map((artist) => (
            <ul class="ulPopular">
            <p> ID: {artist.id}<p>
            </p>Name: {artist.name}</p>
            </ul>
          ))}</p>
          <p> Release Date: {song.release_date} </p>
        </li>
      ))}
      </ol>
      {songList.length > 0 && (
        <div class="pagination-container">
          <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(songList.length / M)}
          handlePageChange={handlePageChange}/>
        </div>
      )}
    </div>
    )}
    {artistList && (
      <div>
        <ol>
        {artistList.slice((currentPage - 1) * M, currentPage * M).map((artist) => (
          <li class="liPopular" key = {artist.id}>
            <p> ID: {artist.id}</p>
            <p> Name: {artist.name}</p>
            <p> Songs: 
            {artist.songs.map((song) => (
              <ul class="ulPopular">
              <p> ID: {song.id} </p>
              <p>Name: {song.name}</p>
              </ul>
            ))}</p>
          </li>
        ))}
        </ol>
        {artistList.length > 0 && (
          <div class="pagination-container">
            <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(artistList.length / M)}
            handlePageChange={handlePageChange}/>
          </div>
        )}
      </div>
    )}
    </form>
  </div>
  );
}

export default Popular;