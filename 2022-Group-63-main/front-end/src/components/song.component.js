import React, {useState} from 'react';
import axios from 'axios';
import "./popular.component.css"

//Songs component that has all methods to get a song, update or delete it.
const Song = () => {

  const [input, setInput] = useState('');
  const [song, setSong] = useState({});
  const [songList, setSongList] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [message, setMessage] = useState('');

  //Checks if input is ID or name
  const handleInput = (event) => {
    event.preventDefault();
    if(input !== '') {
      if (!/\s/.test(input)&&input.length === 22) {
        getSongById();
      } else {
        getSongsByName();
      }
    }
  };

  const getSongById = async () => {
    setMessage('');
    setSongList([]);
    try {
      const response = await axios.get(`http://localhost:8000/songs/id/${input}`);
      setSong(response.data);
    } catch (error) {
      setMessage("Cannot find song!");
      console.error(error);
    }
  };

  const getSongsByName = async () => {
    setMessage('');
    setSong({});
    try {
    const response = await axios.get(`http://localhost:8000/songs/name/${input}`);
    setSongList(response.data);
    } catch (error) {
    setMessage("Cannot find song!");
    console.error(error);
    }
  };

  const updateSong = async () => {
    try {
      await axios.put(`http://localhost:8000/songs/id/${song.id}`, song);
      setMessage("Song has been updated!");
      setSong({});
      setShowUpdate(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSongById = async () => {
    try {
      await axios.delete(`http://localhost:8000/songs/id/${song.id}`);
      setMessage("Song has been deleted!");
      setSong({});
    } catch (error) {
      console.error(error);
    }
  };

  const changeSong = (event) => {
    setSong({
    ...song,
    [event.target.name]: event.target.value,
    });
  };

  const changeArtist = (index, event) => {
    const newArtists = [...song.artists];
    newArtists[index][event.target.name] = event.target.value;
    setSong({ ...song, artists: newArtists });
  };
  
  const addArtist = () => {
    setSong({
    ...song,
    artists: [...song.artists, {name: '' }],
    });
  };
  
  const removeArtist = (index) => {
    const newArtists = [...song.artists];
    newArtists.splice(index, 1);
    setSong({ ...song, artists: newArtists });
  };
  
  return (
    <div class = "center">
      <h1>Search for songs by name or ID</h1>
    <form onSubmit={handleInput}>
    <input
      type="text"
      value={input}
      onChange={(event) => setInput(event.target.value)}
      placeholder="Find song by ID or name"
    />
    <button type="submit">Search</button>
    {song.id && !showUpdate && (
      <div>
      <p>ID: {song.id}</p>
      <p>Name: {song.name}</p>
      <p>Popularity: {song.popularity}</p>
      <p>Duration: {song.duration_ms}</p>
      <p>Artists:</p>
      {song.artists.map((artist) => (
        <li key={artist.id}>
          <p> ID: {artist.id}</p>
          <p> Name: {artist.name} </p>
        </li>
      ))}
      <p>Release Date: {song.release_date}</p>
      <button onClick={() => setShowUpdate(!showUpdate)}>Update</button>
      <button onClick={() => deleteSongById(song.id)}>Delete Song</button>
      </div>
    )}
    {songList && !showUpdate && (
      <div>
    {songList.map((song) => (
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
      </div>
    )}
    {showUpdate && (
    <div>
      <p> ID: {song.id} </p>
      <p> Name:
      <input
        type="text"
        name="name"
        value={song.name}
        onChange={changeSong}
      />
      </p>
      <p> Popularity:
      <input
        type="number"
        name="popularity"
        value={song.popularity}
        onChange={changeSong}
      />
      </p>
      <p> Duration:
      <input
        type="number"
        name="duration_ms"
        value={song.duration_ms}
        onChange={changeSong}
      />
      </p>
      <p>Artists:</p>
      {song.artists.map((artist, index) => (
        <li key={index}>
        <input
          type="text"
          name="id"
          value={artist.id}
          onChange={(event) => changeArtist(index, event)}
        />
        <input
          type="text"
          name="name"
          value={artist.name}
          onChange={(event) => changeArtist(index, event)}
        />
        
        <button onClick={() => removeArtist(index)}>
          Remove
        </button>
        </li>
      ))}
      <button onClick={addArtist}>Add Artist</button>
      <p> Release Date:
      <input
        type="text"
        name="release_date"
        value={song.release_date}
        onChange={changeSong}
      />
      </p>
      <button onClick={updateSong}>Update</button>
      <button onClick={() => setShowUpdate(!showUpdate)}>Undo</button>
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
  
export default Song
;
