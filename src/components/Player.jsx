import React, { useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Player = () => {
  let waveForm;

  const handleClickPlay = () => {
    waveForm.play();
  };

  useEffect(() => {
    waveForm = WaveSurfer.create({
      container: '#waveform',
    });
    waveForm.load('allTalk.wav');
  });

  return (
    <div>
      <button onClick={handleClickPlay}>Play</button>
      <div id="waveform" />
    </div>
  );
};

export default Player;
