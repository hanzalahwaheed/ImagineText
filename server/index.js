const express = require("express");
const multer = require("multer");
const path = require("path");
const tesseract = require("tesseract.js");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname + "/uploads")));
app.use(cors());

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/extractTextFromImage", upload.single("file"), async (req, res) => {
  console.log(req.file.path);
  try {
    const {
      data: { text },
    } = await tesseract.recognize(req.file.path, "eng");
    // res.render("index", { data: text });
    res.json({ text });
  } catch (error) {
    console.log("error in post", error);
  }
});

app.listen(PORT, () => {
  console.log("server started");
});
