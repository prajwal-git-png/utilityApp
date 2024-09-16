import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ImageCompressor from './pages/ImageCompressor';
import QRCodeGenerator from './pages/QRCodeGenerator';
import PDFMerger from './pages/PDFMerger';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/image-compressor" element={<ImageCompressor />} />
          <Route path="/qr-code-generator" element={<QRCodeGenerator />} />
          <Route path="/pdf-merger" element={<PDFMerger />} />
          <Route path="/" element={
            <div>
              <h2>Welcome to the Utilities Web App</h2>
              <p>Select a utility from the menu.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
