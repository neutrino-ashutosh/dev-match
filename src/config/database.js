const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://neutrinoashutosh:rqgxMlP26uufxDM1@learnnode.co6xafd.mongodb.net/devMatch"
  );
};

module.exports = connectDB ;