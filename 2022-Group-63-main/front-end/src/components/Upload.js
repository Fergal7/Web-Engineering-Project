// page where we upload a song

import React, { useState} from "react";
import axios from "axios";
import { Form, Button, Container} from "react-bootstrap";

const Upload = () => {
    const [message, setMessage] = useState('');
    const [newSong, setNewSong] = useState({
        name: '',
    popularity: '',
    duration_ms: '',
    artists: [{name: '' }],
    release_date: '',
  });
    const postSong = async () => {
        try {
          await axios.post(`http://localhost:8000/songs`, newSong);
          setNewSong({
            name: '',
            popularity: '',
            duration_ms: '',
            artists: [{name: '' }],
            release_date: '',
          });
          setMessage("Song has been uploaded!");
        } catch (error) {
          setMessage("Make sure all field are filled in.\n Popularity and duration need to be greater than zero and release date should be in format YYYY-MM-DD!");
          console.error(error);
        }
      };
      
      const changeNewSong = (event) => {
        setNewSong({
        ...newSong,
        [event.target.name]: event.target.value,
        });
      };
      
      const changeNewArtist = (index, event) => {
        const newArtists = [...newSong.artists];
        newArtists[index][event.target.name] = event.target.value;
        setNewSong({ ...newSong, artists: newArtists });
      };
      
      const addNewArtist = () => {
        setNewSong({
        ...newSong,
        artists: [...newSong.artists, {name: '' }],
        });
      };

      const removeNewArtist = (index) => {
        const newArtists = [...newSong.artists];
        newArtists.splice(index, 1);
        setNewSong({ ...newSong, artists: newArtists });
      };


return (
    <div class="center">
    <Container>
        <h1>Upload a Song</h1>
        <Form>
            <Form.Group controlId="formBasicName">
                <Form.Label>Song Name <span style={{color : 'red'}}>*</span></Form.Label>
                <p>
      <input
        type="text"
        name="name"
        value={newSong.name}
        onChange={changeNewSong}
        placeholder="Name"
      />
      </p>
            </Form.Group>
            <Form.Group controlId="formBasicPopularity">
                <Form.Label>Popularity <span style={{color : 'red'}}>*</span></Form.Label>
                <p>
      <input
        type="number"
        name="popularity"
        value={newSong.popularity}
        onChange={changeNewSong}
        placeholder="Popularity"
      />
      </p>
            </Form.Group>
            <Form.Group controlId="formBasicDuration">
                <Form.Label>Duration <span style={{color : 'red'}}>*</span></Form.Label>
                <p>
      <input
        type="number"
        name="duration_ms"
        value={newSong.duration_ms}
        onChange={changeNewSong}
        placeholder="Duration"
      />
      </p>
            </Form.Group>
            <Form.Group controlId="formBasicArtists">
                <Form.Label>Artists <span style={{color : 'red'}}>*</span></Form.Label>

      {newSong.artists.map((artist, index) => (
        <li key={index}>
       
        <input
          type="text"
          name="name"
          value={artist.name}
          onChange={(event) => changeNewArtist(index, event)}
          placeholder="Name"
        />
        <button type="button" onClick={() => addNewArtist()}>
          Add
        </button>
        <button type="button" onClick={() => removeNewArtist(index)}>
          Remove 
        </button>
        </li>
      ))}
    
      
            </Form.Group>
            <Form.Group controlId="formBasicRelease">
                <Form.Label>Release Date <span style={{color : 'red'}}>*</span></Form.Label>
                <p>
      <input
        type="text"
        name="release_date"
        value={newSong.release_date}
        onChange={changeNewSong}
        placeholder="YYYY-MM-DD"
      />
      </p>
            </Form.Group>
            

        </Form>
    </Container>
    <Button onClick={postSong}>Upload</Button>
    {message && (
      <div>
        <p>{message}</p>
      </div>
    )}

    </div>

)
        
}

export default Upload;
    