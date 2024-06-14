const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const qr = require("qr-image");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000; // Use dynamic port if provided

app.use(cors());
app.use(bodyParser.json());
app.use("/qr_codes", express.static(path.join(__dirname, "qr_codes"))); // Serve static files from qr_codes directory

app.post("/generateQR", (req, res) => {
  const url = req.body.url;
  console.log(url);

  // Ensure the qr_codes directory exists
  const qrCodesDir = path.join(__dirname, "qr_codes");
  if (!fs.existsSync(qrCodesDir)) {
    fs.mkdirSync(qrCodesDir);
  }

  try {
    const qrSvg = qr.image(url, { type: "png" });
    const filePath = path.join(qrCodesDir, "qr_code.png");
    const output = fs.createWriteStream(filePath);

    qrSvg.pipe(output);

    output.on("finish", () => {
      console.log(`QR Code generated and saved as ${filePath}`);
      res.json({ success: true, filePath: "/qr_codes/qr_code.png" }); // Return the correct path for the static file
    });

    output.on("error", (err) => {
      console.error("Error writing QR code file:", err);
      res.json({ success: false, error: err });
    });

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The URL has been saved to URL.txt");
    });
  } catch (err) {
    console.error("An error occurred:", err);
    res.json({ success: false, error: err });
  }
});

app.post("/deleteQR", (req, res) => {
  const filePath = path.join(__dirname, "qr_codes", "qr_code.png");
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting QR code file:", err);
      res.json({ success: false, error: err });
    } else {
      console.log("QR Code deleted successfully");
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
