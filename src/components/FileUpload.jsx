import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles/fileupload.module.css';
import { BeatLoader } from 'react-spinners';

const FileUpload = ({ handleAddTrack }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async () => {
    if (!fileName) {
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('audio', file);
    try {
      await axios.post('/audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handleAddTrack(fileName);
      setUploading(false);
      setFileName(null);
    } catch (err) {
      console.log(err);
    }
  };

  let selectedFile;

  if (uploading) {
    selectedFile = <BeatLoader size={30} />;
  } else {
    selectedFile = fileName ? <div>{fileName}</div> : <div>No file selected</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>Upload a file</div>
      </div>
      <input id="file" type="file" onChange={handleChange} className={styles.hidden} />
      <div className={styles.wrapper}>
        <label  className={styles.button} htmlFor="file">Choose File</label>
        <button className={styles.button} onClick={handleSubmit}>Upload</button>
        {selectedFile}
      </div>
    </div>
  );
};

export default FileUpload;
