const express = require("express");
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "mytoken123"; 

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    res.status(200).send(challenge);
  } else {
    console.error("Verification failed.");
    res.sendStatus(403);
  }
});

app.post("/webhook", (req, res) => {
  console.log("Webhook received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Webhook running on port 3000"));
