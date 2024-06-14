$(document).ready(function () {
  $("#generateBtn").click(function () {
    const url = $("#qrInput").val();
    console.log(url);

    // Send URL to the server to generate QR code
    fetch("https://qr-code-generator-knsn.onrender.com/generateQR", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("QR code generated successfully");
          const qrCodeUrl = `https://qr-code-generator-knsn.onrender.com${data.filePath}`;
          downloadQRCode(qrCodeUrl);
        } else {
          console.error("Error generating QR code");
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  function downloadQRCode(url) {
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr_code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Optionally, delete the QR code image after download
    fetch("https://qr-code-generator-knsn.onrender.com/deleteQR", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("QR code deleted successfully");
        } else {
          console.error("Error deleting QR code");
        }
      })
      .catch((error) => console.error("Error:", error));
  }
});
