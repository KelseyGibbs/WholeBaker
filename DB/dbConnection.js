const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGODB_URI || "mongodb://localhost/WholeBaker";
// Allow Promises
mongoose.Promise = global.Promise;
// Connection
mongoose.connect(MONGO_URL, { useNewUrlParser: true });
// Validation
 mongoose.connection
  .on("open", () => console.info("Database connected!"))
  .on("error", err => console.info("Create a database"));

  