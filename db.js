const Mongoose = require("mongoose");

const localDb = "mongodb://localhost:27017/mydb";

const connectDb = async () => {
  try {
    const response = await Mongoose.connect(localDb);
    if (response) {
      console.log("Database Connected");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
