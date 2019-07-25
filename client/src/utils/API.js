import axios from "axios";

export default {
  // Gets all Products
  getProducts: function() {
    return axios.get("/api/Products");
  },
  // Gets the Product with the given id
  getProduct: function(id) {
    return axios.get("/api/Products/" + id);
  },
  // Deletes the Product with the given id
  deleteProduct: function(id) {
    return axios.delete("/api/Products/" + id);
  },
  // Saves a Product to the database
  saveProduct: function(ProductData) {
    return axios.post("/api/Products", ProductData);
  },  
 
  // Updates a single Product in the databases quantity
  updateProduct: function(id, body) {
  return axios.put("/api/Products/" + id, {quantity: body});
  },

   // Saves a Product to the orders database
  saveOrder: function(orderData) {
    return axios.post("/api/orders", orderData);
  },

  // Gets all objects from the cartsDB
  getOrders: function() {
    return axios.get("/api/orders");
  }
  
};


