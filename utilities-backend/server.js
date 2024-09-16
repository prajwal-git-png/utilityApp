const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json());

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

// Sample API to test the server
app.get('/', (req, res) => {
  res.send('Welcome to the Utilities API!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



// handling is started from here 

const sharp = require('sharp');

app.post('/compress-image', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    // Compress the image using sharp
    await sharp(file.path)
      .resize({ width: 800 }) // Resize the image
      .jpeg({ quality: 60 })  // Compress the image
      .toFile(`compressed-${file.filename}.jpg`);

    res.download(`compressed-${file.filename}.jpg`, (err) => {
      if (err) console.error(err);
    });
  } catch (error) {
    res.status(500).json({ error: 'Image compression failed' });
  }
});



const QRCode = require('qrcode');

app.post('/generate-qr', async (req, res) => {
  const { text } = req.body;

  try {
    // Generate QR Code
    const qrCodeDataUrl = await QRCode.toDataURL(text);
    
    // Return the generated QR code as an image
    res.json({ qrCode: qrCodeDataUrl });
  } catch (error) {
    res.status(500).json({ error: 'QR code generation failed' });
  }
});


// HANDLES pdfs
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

app.post('/merge-pdf', upload.array('files', 10), async (req, res) => {
  try {
    const files = req.files;

    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const outputFilePath = `merged-${Date.now()}.pdf`;

    fs.writeFileSync(outputFilePath, mergedPdfBytes);
    
    res.download(outputFilePath, (err) => {
      if (err) console.error(err);
    });
  } catch (error) {
    res.status(500).json({ error: 'PDF merge failed' });
  }
});

