import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from './Player';
import FileUpload from './FileUpload';
import styles from './styles/app.module.css';

const App = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await axios.get('/audio');
      setTracks(data);
    } catch(err) {
      console.log(err);
    }
  }, []);

  const handleAddTrack = (track) => {
    const newTracks = [...tracks, track];
    setTracks(newTracks);
  };

  return (
    <div className={app}>
      <nav className={styles.nav}>
        <div className={styles.title}>Sample Share</div>
      </nav>
      <FileUpload handleAddTrack={handleAddTrack} />
      <div>
        {tracks.map((track, index) => <Player trackUrl={track} id={index} key={index} />)}
      </div>
    </div>
  );
};

export default App;
