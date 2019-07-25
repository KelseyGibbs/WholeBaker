const mongoose = require("mongoose");
const db = require("../models");

// This file empties the products collection and inserts the products below

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/WholeBaker";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});

const productSeed = [
  {
    name: "Baguette",
    price: 3.5,
    photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sourdough-bread-horizontal-466-1548048509.jpg?crop=0.669xw:1.00xh;0.331xw,0&resize=100:*"
  },{
    name: "Croissant",
    price: 4,
    photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sourdough-bread-horizontal-466-1548048509.jpg?crop=0.669xw:1.00xh;0.331xw,0&resize=100:*"
  },{
    name: "Fougasse",
    price: 5,
    photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sourdough-bread-horizontal-466-1548048509.jpg?crop=0.669xw:1.00xh;0.331xw,0&resize=100:*"
  },{
    name: "Danish",
    price: 9,
    photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sourdough-bread-horizontal-466-1548048509.jpg?crop=0.669xw:1.00xh;0.331xw,0&resize=100:*"
  },
];

db.Product
  .remove({})
  .then(() => db.Product.collection.insertMany(productSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
