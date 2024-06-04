import React, { useState } from "react";
import styles from "./App.module.css";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import { Spotify } from "../../util/Spotify";

function App() {
  const [searchResults, setSeachResults] = useState([
    {
      name: 'example track name 1',
      artist: 'example track artist 1',
      album: 'example track album 1',
      id: 1,
    },
    {
      name: 'example track name 2',
      artist: 'example track artist 2',
      album: 'example track album 2',
      id: 2,
    },
  ]);

  const [playlistName, setPlaylistName] = useState("Example Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: 'example Playlist name 1',
      artist: 'example Playlist artist 1',
      album: 'example Playlist album 1',
      id: 1,
    },
    {
      name: 'example Playlist name 2',
      artist: 'example Playlist artist 2',
      album: 'example Playlist album 2',
      id: 2,
    },

  ]);

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);

    if (existingTrack) {
      console.log('track already exists');
    } else {
      setPlaylistTracks(newTrack);
    }

  }

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);

    })
  }

  function search(term) {
    Spotify.search(term).then(result =>
      setSeachResults(result));
    console.log(term);
  }



  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>MMM</span>ing
      </h1>
      <div className={styles.App}>
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} />

        <div className={styles["App-playlist"]}>
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
          {/* <!-- Add a Playlist component --> */}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;