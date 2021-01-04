import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlayCircle } from 'react-icons/fa';
import axios from 'axios';
import fileDownload from 'js-file-download';
import styles from './styles/player.module.css';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };
    this.waveFormId = `waveform${props.id}`;
    this.handlePlay = this.handlePlay.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
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

  handleDownload() {
    const { trackUrl } = this.props;

    axios({
      url: `/audio/${trackUrl}`,
      method: 'GET',
      responseType: 'blob',
    })
    .then(({data}) => {
      console.log(data);
      fileDownload(data, `${trackUrl}`);
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <FaPlayCircle size={30} onClick={this.handlePlay} />
          <div>{this.props.trackUrl}</div>
        </div>
        <div id={this.waveFormId}/>
          <button onClick={this.handleDownload} className={styles.button}>download</button>
          <button onClick={() => this.props.handleDeleteTrack(this.props.trackUrl)} className={styles.button}>delete</button>
      </div>
    );
  }
}
