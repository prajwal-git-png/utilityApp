// src/pages/PDFMerger.js
import React, { useState } from 'react';

function PDFMerger() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('files', file);
    }

    const response = await fetch('http://localhost:5000/merge-pdf', {
      method: 'POST',
      body: formData,
    });

    const result = await response.blob();
    const url = URL.createObjectURL(result);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'merged-document.pdf';
    link.click();
  };

  return (
    <div className='image-compressor-container'>
      <h2>PDF Merger</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} multiple accept=".pdf" />
        <button className='button' type="submit">Merge</button>
      </form>
    </div>
  );
}

export default PDFMerger;
