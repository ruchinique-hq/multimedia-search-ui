import './App.css';
import React, { useState, useEffect } from 'react';

import { uploadFile } from './components/amazon/FileUploader';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      async function upload() {
        const response = await uploadFile(selectedFile);
        if (response != null) {
        
        }
      }

      upload();
    }
  }, [selectedFile]);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  }

  return (
    <div className="App">
      Upload file
      <input type="file" onChange={handleFileInput} />
    </div>
  );
}

export default App;
