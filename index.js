const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.static("files"));
app.use("/image", express.static(path.join(__dirname, "junk")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "junk");
  },
  filename: function (req, file, cb) {
    // Customize the filename as per your requirements
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "files", "index.html"));
});

app.get("/photos", (req, res) => {
  res.sendFile(path.join(__dirname, "files", "photo.html"));
});

app.post("/files", upload.array("files"), (req, res) => {
  const urls = [];
  req.files.forEach((file) => {
    fs.appendFileSync(
      "urls.txt",
      `http://localhost:5000/files/${file.path
        .split("/")
        .slice(1)
        .toString()}` + "\n",
      (err) => {
        return res.status(400).json({ message: "Error uploading file" });
      }
    );
    urls.push(file.path);
  });
  return res.status(200).json({ message: "Files uploaded successfully" });
});

app.get("/files/:name", (req, res) => {
  const name = req.params.name;
  if (fs.existsSync(`junk/${name}`)) {
    const readStream = fs.createReadStream(`junk/${name}`);
    readStream.pipe(res);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});
app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port 5000");
});

app.get("/allfiles", (req, res) => {
  fs.readFile("urls.txt", "utf8", (err, data) => {
    if (err) {
      res.json({ message: "Error reading file" });
    } else {
      const urls = data.split("\n");
      const filteredUrls = urls.filter((url) => url !== "" && url !== null);
      res.json(filteredUrls);
    }
  });
});
