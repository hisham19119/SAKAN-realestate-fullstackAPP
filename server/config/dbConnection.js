const mongoose = require("mongoose");
const url = process.env.MONGO_URL ? process.env.MONGO_URL : process.env.PORT;

const dbConnection = () => {
  mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB");
  });
};

module.exports = dbConnection;
