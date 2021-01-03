import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles/fileupload.module.css';

const FileUpload = ({ handleAddTrack }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('audio', file);
    try {
      const res = await axios.post('/audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handleAddTrack(fileName);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>Upload a file</div>
      </div>
      <input id="file" type="file" onChange={handleChange} className={styles.hidden} />
      <div className={styles.wrapper}>
        <label  className={styles.button} htmlFor="file">Choose File</label>
        <button className={styles.button} onClick={handleSubmit}>Upload</button>
      </div>
    </div>
  );
};

export default FileUpload;
