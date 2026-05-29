const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = "./data.json";

// READ DATA
const readData = () => {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
};

// WRITE DATA
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// HOME
app.get("/", (req, res) => {
  res.send("Server Running");
});

// GET POSTS
app.get("/posts", (req, res) => {
  const data = readData();
  res.json(data);
});

// ADD POST
app.post("/posts", (req, res) => {

  const data = readData();

  const newPost = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
    comments: []
  };

  data.push(newPost);

  writeData(data);

  res.json(newPost);
});

// DELETE POST
app.delete("/posts/:id", (req, res) => {

  let data = readData();

  data = data.filter(post => post.id != req.params.id);

  writeData(data);

  res.json({
    message: "Post deleted"
  });
});

// ADD COMMENT
app.post("/posts/:id/comment", (req, res) => {

  const data = readData();

  const post = data.find(
    p => p.id == req.params.id
  );

  if (post) {

    post.comments.push(req.body.text);

    writeData(data);

    res.json({
      message: "Comment added"
    });

  } else {

    res.status(404).json({
      message: "Post not found"
    });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});