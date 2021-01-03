import React, { useState } from 'react';
import axios from 'axios';

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
    console.log(formData);
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
    <div>
      <div>Upload a file</div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FileUpload;
