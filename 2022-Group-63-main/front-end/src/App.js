import './App.css' 
import React, { Component } from "react";
import { Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";


import Home from "./Home";
import Song from "./components/song.component";
import Upload from "./components/Upload";
import Artist from "./components/artist.component";
import Popular from "./components/popular.component";

//Main component with the navbar that connects to the components
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Song />} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/artists" element={<Artist/>} />
          <Route path="/popular" element={<Popular/>}/>
        </Routes>
      </div>
    );
  }
}

export default App;