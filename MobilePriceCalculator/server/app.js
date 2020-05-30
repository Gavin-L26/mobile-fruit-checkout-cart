const express = require("express");
var cors = require("cors");
const app = express();
const port = 5000;
const data = require("./itemPrice.json");

app.use(cors());

app.get("/hello", (req, res) => res.send("Hello World!"));

app.get("/getApple", (req, res) => res.send(data.apple));
app.get("/getBanana", (req, res) => res.send(data.banana));
app.get("/getOrange", (req, res) => res.send(data.orange));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
