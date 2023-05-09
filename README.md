# Simple Image Server in Node.js



This repository contains a simple image server implemented in Node.js. The server allows you to upload images, and the URLs of the uploaded images are stored in a text file. You can retrieve all the URLs and display them in an HTML page.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/simple-image-server.git
   cd SimpleImageSeverInNodejs
   node index.js or nodemon index.js
   ```
   Open a web browser and visit http://localhost:5000 to access the upload form.

Select one or multiple image files using the file input field and click the "Submit" button to upload them.

The server will save the uploaded images to the uploads folder and store the URLs in the urls.txt file.

To retrieve all the image URLs, visit http://localhost:5000/allfiles in your web browser. The server will return a JSON response containing all the URLs.

Implementation Details
The image server is implemented using Node.js and the Express framework. It utilizes the following libraries:

Multer: Middleware for handling multipart/form-data, used for uploading files.

fs: Node.js built-in module for working with the file system. It is used to read, append, and write the URLs to the urls.txt file.

When a file is uploaded, the server saves it to the uploads folder using a unique filename. The URL of the uploaded image is then appended to the urls.txt file.

To retrieve all the image URLs, the server reads the urls.txt file and returns a JSON response containing all the URLs.


Contributing
Contributions to the project are welcome! If you find a bug or want to add a new feature, please open an issue or submit a pull request.


