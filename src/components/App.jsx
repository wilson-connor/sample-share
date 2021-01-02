import React, { useState, useEffect } from 'react';
import Player from './Player';

const App = () => {
  const [tracks, setTracks] = useState([]);

  //  this will eventually be used to fetch track urls. For now it just grabs 2 of the same track
  useEffect(() => {
    setTracks(['allTalk.wav', 'allTalk.wav']);
    setTracks([
      { name: 'all talk', url: 'allTalk.wav' },
      { name: 'all talk', url: 'allTalk.wav' },
    ]);
  }, []);

  return (
    <div>
      <div>
        {tracks.map(({ name, url }, index) => <Player trackName={name} trackUrl={url} id={index} key={index} />)}
      </div>
    </div>
  );
};

export default App;
