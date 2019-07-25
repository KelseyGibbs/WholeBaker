
const mongoose = require("mongoose");
const db = require("../models");

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/WholeBaker";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});

const orderSeed = [
  {
    customer: "WholeBaker",
    quantity: 12,
    title: "bread",
    price: 9,
    date: new Date(Date.now())
  },{
    customer: "Ole Red",
    quantity: 12,
    title: "Focc",
    price: 9,
    date: new Date(Date.now())
  },{
    customer: "Red",
    quantity: 5,
    title: "Focc",
    price: 9,
    date: new Date(Date.now())
  },{
    customer: "Ole Red",
    quantity: 12,
    title: "Focc",
    price: 9,
    date: new Date(Date.now())
  },{
    customer: "Ole Red",
    quantity: 12,
    title: "Focc",
    price: 9,
    date: new Date(Date.now())
  }
];

db.Order
  .remove({})
  .then(() => db.Order.collection.insertMany(orderSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
