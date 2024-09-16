// src/pages/QRCodeGenerator.js
import React, { useState } from 'react';

function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send text to backend API
    const response = await fetch('http://localhost:5000/generate-qr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const { qrCode } = await response.json();
    setQrCodeUrl(qrCode);  // qrCode will be the URL of the generated QR code
  };

  return (
    <div className='image-compressor-container'>
      <h2>QR Code Generator</h2>
      <form className='input-wrapper' onSubmit={handleSubmit}>
        <input
          
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL"
        />
        <button className='button' type="submit">Generate QR Code</button>
      </form>
      {qrCodeUrl && (
        <div >
          <h3>Your QR Code:</h3>
          <img className='image-preview' src={qrCodeUrl} alt="Generated QR Code" />
          <a href={qrCodeUrl} download="qr-code.png"  className='dounload-btn'>Download</a>
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
