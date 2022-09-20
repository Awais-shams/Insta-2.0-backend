const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on ${port}...`));

app.use("/", async (req, res) => {
  res.send("Hello World");
});
