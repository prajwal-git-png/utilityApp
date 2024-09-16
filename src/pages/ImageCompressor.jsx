// src/pages/ImageCompressor.js
import React, { useState } from 'react';

function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    // Send file to backend API (you'll need to set up the API in Express)
    const response = await fetch('http://localhost:5000/compress-image', {
      method: 'POST',
      body: formData,
    });

    const result = await response.blob(); // Assuming the response is the compressed image
    const url = URL.createObjectURL(result);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'compressed-image.jpg';
    link.click();
  };

  return (
    <div className='image-compressor-container '>
      <h2>Image Compressor</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button className='button' type="submit">Compress</button>
      </form>
    </div>
  );
}

export default ImageCompressor;
