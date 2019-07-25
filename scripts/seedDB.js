

const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Recipes collection and inserts the recipes below

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/WholeBaker";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});


const recipeSeed = [
  {
    title: "Baguette",
    quantity: 1,
    price: 3.5,
    inventory: 22,
    description:
    "A baguette (/bæˈɡɛt/; French: [baˈɡɛt]) is a long, thin loaf of French bread that is commonly made from basic lean dough (the dough, though not the shape, is defined by French law).",
    date: new Date(Date.now())
  },{
    title: "Croissant",
    quantity: 1,
    price: 4,
    inventory: 22,
    description:
      "Croissants and other viennoiserie are made of a layered yeast-leavened dough. The dough is layered with butter, rolled and folded several times in succession, then rolled into a sheet, in a technique called laminating. The process results in a layered, flaky texture, similar to a puff pastry.",
    date: new Date(Date.now())
  },{
    title: "Fougasse",
    quantity: 1,
    price: 5,
    inventory: 22,
    description:
      "In French cuisine, fougasse is a type of bread typically associated with Provence but found (with variations) in other regions. Some versions are sculpted or slashed into a pattern resembling an ear of wheat.",
    date: new Date(Date.now())
  },{
    title: "Danish",
    quantity: 1,
    price: 9,
    inventory: 22,
    description:
      "a light, rich, flaky pastry, especially a puff paste, leavened with yeast and often filled with cheese, nuts and raisins, custard, or fruit. ",
    date: new Date(Date.now())
  },
];

db.Recipe
  .remove({})
  .then(() => db.Recipe.collection.insertMany(recipeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
