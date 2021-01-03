import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import styles from './styles/player.module.css';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };
    this.waveFormId = `waveform${props.id}`;
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    const { trackUrl } = this.props;

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: `#${this.waveFormId}`,
      backend: 'WebAudio',
      height: 80,
      progressColor: '#2D5BFF',
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent',
    });

    this.waveform.load(`assets/${trackUrl}`);
  };

  handlePlay() {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  }

  render() {
    return (
      <div className={styles.player}>
        {!this.state.playing ? <FaPlayCircle size={20} onClick={this.handlePlay} /> : <FaPauseCircle size={20} onClick={this.handlePlay} />}
        <div id={this.waveFormId} />
      </div>
    );
  }
}
