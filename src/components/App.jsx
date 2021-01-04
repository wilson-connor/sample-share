import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from './Player';
import FileUpload from './FileUpload';
import styles from './styles/app.module.css';

const App = () => {
  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    try {
      const { data } = await axios.get('/audio');
      setTracks(data);
    }
      catch (err) {
      throw err;
    }
  };

  useEffect(async () => {
    try {
      getTracks();
    } catch(err) {
      console.log(err);
    }
  }, []);

  const handleAddTrack = (track) => {
    const newTracks = [...tracks, track];
    setTracks(newTracks);
  };

  const handleDeleteTrack = (track) => {
    axios.delete(`/audio/${track}`)
      .then(() => getTracks())
      .catch((fail) => console.log(fail));
  };

  return (
    <div className={app}>
      <nav className={styles.nav}>
        <div className={styles.title}>Sample Share</div>
      </nav>
      <FileUpload handleAddTrack={handleAddTrack} />
      <div>
        {tracks.map((track, index) => <Player trackUrl={track} id={index} key={index} handleDeleteTrack={handleDeleteTrack} />)}
      </div>
    </div>
  );
};

export default App;
