import React, {useState} from 'react';
import axios from 'axios';
import "./popular.component.css"

//Artist component that has all the methods to get songs or summary
const Artist = () => {

  const [input, setInput] = useState('');
  const [request, setRequest] = useState("songs");
  const [songList, setSongList] = useState([]);
  const [summary, setSummary] = useState({});
  const [message, setMessage] = useState('');

  //Checks if input is ID or name and if it should return songs or summary
  const handleInput = (event) => {
  event.preventDefault();
  if(input !== '') {
    if (!/\s/.test(input)&&input.length === 22) {
    if(request === "songs") {
      getSongsById();
    } else {
      getSummaryById();
    }
    } else {
    if(request === "songs") {
      getSongsByName();
    } else {
      getSummaryByName();
    }
    }
  }
  };

  const getSongsById = async () => {
    setMessage('');
    setSummary({});
    setSongList([]);
  try {
    const response = await axios.get(`http://localhost:8000/artists/songs/id/${input}`);
    setSongList(response.data);
    const songs = response.data;
      if(songs.songs[0] === undefined) {
        setSongList([]);
        setMessage('Cannot find songs!');
      }
  } catch (error) {
    setMessage('Cannot find songs!');
    console.log(error);
  }
}

  const getSongsByName = async () => {
    setMessage('');
    setSummary({});
    setSongList([]);
    try {
      const response = await axios.get(`http://localhost:8000/artists/songs/name/${input}`);
      setSongList(response.data);
      const songs = response.data;
      if(songs.songs[0] === undefined) {
        setSongList([]);
        setMessage('Cannot find songs!');
      }
    } catch (error) {
      setMessage('Cannot find songs!');
      console.log(error);
    }
  }

  const getSummaryById = async () => {
    setMessage('');
    setSummary({});
    setSongList([]);
    try {
      const response = await axios.get(`http://localhost:8000/artists/summary/id/${input}`);
      setSummary(response.data);
    } catch (error) {
      setMessage('Cannot find summary!');
      console.log(error);
    }
  }

  const getSummaryByName = async () => {
    setMessage('');
    setSummary({});
    setSongList([]);
    try {
      const response = await axios.get(`http://localhost:8000/artists/summary/name/${input}`);
      setSummary(response.data);
    } catch (error) {
      setMessage('Cannot find summary!');
      console.log(error);
    }
  }

  const deleteSongs = async () => {
    try {
      await axios.delete(`http://localhost:8000/artists/songs/name/${input}`);
      setMessage('Songs deleted succesfully!');
      setSongList([]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div class = "center">
      <h1>Search for artist songs or a summary of their songs</h1>
    <form onSubmit={handleInput}>
    <input
      type="text"
      value={input}
      onChange={(event) => setInput(event.target.value)}
      placeholder="Find artist by ID or name"
    />
    <button type="submit">Search</button>
    <select 
      type="text"
      value={request}
      onChange={(event) => setRequest(event.target.value)}>
      <option value="songs">Songs</option>
      <option value="summary">Summary</option>
    </select>
    {songList.songs && (
      <div>
        {songList.songs.map((song) => (
          <li class="liPopular" key = {song.id}>
            <p> ID: {song.id}</p>
            <p> Name: {song.name}</p>
            <p> Popularity: {song.popularity}</p>
            <p> Release Date: {song.release_date}</p>
          </li>
        ))}
        <button onClick={() => deleteSongs()}>Delete Songs</button>
      </div>
    )}
    {summary.summary && (
      <div>
        <h5>Number of songs: {summary.summary.number_of_songs}</h5>
        <h5> Earliest release: </h5>
        <p> ID: {summary.summary.earliest_release.id}</p>
        <p> Name: {summary.summary.earliest_release.name}</p>
        <p> Popularity: {summary.summary.earliest_release.popularity} </p>
        <p> Release Date: {summary.summary.earliest_release.release_date}</p>
        <h5>Latest release: </h5>
        <p> ID: {summary.summary.latest_release.id}</p>
        <p> Name: {summary.summary.latest_release.name}</p>
        <p> Popularity: {summary.summary.latest_release.popularity} </p>
        <p> Release Date: {summary.summary.latest_release.release_date}</p>
        <h5>Most popular: </h5>
        <p> ID: {summary.summary.most_popular.id}</p>
        <p> Name: {summary.summary.most_popular.name}</p>
        <p> Popularity: {summary.summary.most_popular.popularity} </p>
        <p> Release Date: {summary.summary.most_popular.release_date}</p>
      </div>
    )}
    {message && (
      <div>
        <p>{message}</p>
      </div>
    )}
    </form>
    </div>
    );
  };

export default Artist;