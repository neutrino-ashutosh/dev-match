const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup" , async (req, res) => {
  // creating a new instance of the user model
  const user = new User({
    firstName: "aakansha",
    lastName: "singh",
    emailId: "aakanshavgk@gmail.com",
    password : "12345",
  });

  await user.save();
  res.send("user added successfully");
});

connectDB()
  .then( () => {
    console.log("connection with cluster established ");
    app.listen(3000 , () => {
    console.log("server is successfully listening on port 3000...");
  });
  })
  .catch((err) => {
    console.log("database cannot be connected");
})
