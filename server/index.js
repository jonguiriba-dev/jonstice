const express = require("express");
const cors = require("cors");
const FirebaseService = require("./src/Services/Firebase/Firebase.js");
const { ERROR_MESSAGES, STATUS_CODES } = require("./src/Constants/main.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  try {
    let snapshot = await FirebaseService.get("posts", {
      orderBy: ["timestamp", "desc"],
    });

    let data = [];

    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    res.status(STATUS_CODES.SUCCESS).send(data);
  } catch (err) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
});

app.post("/post", async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(STATUS_CODES.BAD_REQUEST).send("Post requires a title");
      return;
    }

    await FirebaseService.save("posts", {
      title: req.body.title,
      text: req.body.text,
      timestamp: Date.now(),
    });

    res.status(STATUS_CODES.SUCCESS).send();
  } catch (err) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
});

app.listen(3000, () => {
  FirebaseService.init();
  console.log("Listen on the port 3000...");
});
