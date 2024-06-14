# QR Code Generator

This project is a QR Code Generator web application built with Express.js and jQuery. It allows users to input a URL, generate a QR code for that URL, and download the QR code as a PNG file.

## Features

- Input a URL to generate a QR code.
- Download the generated QR code as a PNG file.
- Automatically delete the QR code after download.

## Technologies Used

- Node.js
- Express.js
- jQuery
- qr-image (QR code generation)
- Render (Hosting)

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (https://nodejs.org/)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/qr-code-generator.git
   cd qr-code-generator
   
2. Install dependencies:

    ```bash
    npm install
    
Running the Application Locally

1. Start the server:

   ```bash
   node server.js

2. Open public/index.html in your browser to use the application.
   
File Structure

```php
qr-code-generator/
├── qr_codes/                # Directory for generated QR codes
├── public/
│   ├── index.html           # Frontend HTML file
│   ├── index.js             # Frontend JavaScript file
├── server.js                # Express server setup
├── package.json             # Node.js dependencies and scripts
└── README.md                # Project documentation

Example Usage

1. Open the application in your browser.
2. Enter a URL in the input field.
3. Click the "Generate QR Code" button.
4. The QR code will be generated and downloaded automatically.
5. The QR code image will be deleted from the server after download.
