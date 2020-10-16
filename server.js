const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000;

const data = require('./budget');

// app.use("/", express.static("public"));
app.use(cors());


app.get("/budget", (req, res) => {
  res.json(data);
});


app.listen(port, () => {
  console.log(`example app listening at port - ${port}`);
});
