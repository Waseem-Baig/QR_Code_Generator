const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const qr = require("qr-image");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Generate QR code
app.post("/generateQR", (req, res) => {
  const url = req.body.url;
  console.log(url);

  // Ensure the qr_codes directory exists
  const qrCodesDir = path.join(__dirname, "qr_codes");
  if (!fs.existsSync(qrCodesDir)) {
    fs.mkdirSync(qrCodesDir);
  }

  try {
    // Generate QR code and pipe to a file
    const qrSvg = qr.image(url, { type: "png" });
    const filePath = path.join(qrCodesDir, "qr_code.png");
    const output = fs.createWriteStream(filePath);

    qrSvg.pipe(output);

    output.on("finish", () => {
      console.log(`QR Code generated and saved as ${filePath}`);
      res.json({ success: true, filePath: "/qr_codes/qr_code.png" });
    });

    output.on("error", (err) => {
      console.error("Error writing QR code file:", err);
      res.json({ success: false, error: err });
    });

    // Write the URL to a text file
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The URL has been saved to URL.txt");
    });
  } catch (err) {
    console.error("An error occurred:", err);
    res.json({ success: false, error: err });
  }
});

// Serve the QR code image and delete it after serving
app.get("/downloadQR", (req, res) => {
  const filePath = path.join(__dirname, "qr_codes", "qr_code.png");
  res.download(filePath, "qr_code.png", (err) => {
    if (err) {
      console.error("Error downloading QR code file:", err);
      res.status(500).send("Error downloading QR code file");
    } else {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting QR code file:", err);
        } else {
          console.log("QR Code deleted successfully");
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
