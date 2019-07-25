const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer: { type: String, required: true, default: "Kelsey" },
  quantity: { type: Number, required: true, default: 1 },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
