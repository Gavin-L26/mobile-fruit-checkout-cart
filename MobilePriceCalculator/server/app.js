const express = require("express");
var cors = require("cors");
const app = express();
const port = 5000;
const data = require("./itemPrice.json");
const tax = 1.13;
var bodyParser = require("body-parser");

var cart = {
  totalPrice: 0,
  taxed: false,
};

app.use(bodyParser.json());
app.use(cors());

function resetCart() {
  cart.totalPrice = 0;
  cart.taxed = false;
}

function roundPrice(price) {
  return Math.round(price * 100) / 100;
}

app.get("/hello", (req, res) => res.send("Hello World!"));

app.post("/addItem", (req, res) => {
  var name = req.body.name;
  var price = data[name]["price"];
  if (cart.taxed) {
    price = roundPrice(price * 1.13);
  }
  cart.totalPrice = roundPrice(cart.totalPrice + price);
  console.log(cart.totalPrice);
  res.send({ totalPrice: cart.totalPrice });
});

app.post("/removeItem", (req, res) => {
  var name = req.body.name;
  var price = data[name]["price"];
  if (cart.taxed) {
    price = roundPrice(price * 1.13);
  }
  cart.totalPrice = roundPrice(cart.totalPrice - price);
  console.log(cart.totalPrice);
  res.send({ totalPrice: cart.totalPrice });
});

app.get("/addTax", (req, res) => {
  if (cart.taxed == false) {
    cart.totalPrice = roundPrice(cart.totalPrice * 1.13);
    cart.taxed = true;
    res.send({ mes: "now taxed" });
  } else {
    res.send({ mes: "already taxed" });
  }
});

app.get("/removeTax", (req, res) => {
  if (cart.taxed) {
    cart.totalPrice = roundPrice(cart.totalPrice / 1.13);
    cart.taxed = false;
    res.send({ mes: "now untaxed" });
  } else {
    res.send({ mes: "already untaxed" });
  }
});

app.get("/getTotalPrice", (req, res) =>
  res.send({ totalPrice: cart.totalPrice })
);

app.get("/getTaxed", (req, res) => res.json({ taxed: cart.taxed }));

app.get("/reset", (req, res) => {
  resetCart();
  console.log("reset successfull");
  res.end();
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = {
  roundPrice: roundPrice,
};
