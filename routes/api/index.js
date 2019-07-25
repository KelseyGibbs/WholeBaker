const router = require("express").Router();
const orderRoutes = require("./orders");

// Order API route
router.use("/orders", orderRoutes);


module.exports = router;
