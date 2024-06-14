$(document).ready(function () {
  $("#generateBtn").click(function () {
    const url = $("#qrInput").val();
    console.log(url);

    // Send URL to the server to generate QR code
    fetch("http://localhost:3000/generateQR", {
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
          // Trigger the download
          window.location.href = "http://localhost:3000/downloadQR";
        } else {
          console.error("Error generating QR code");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
});
