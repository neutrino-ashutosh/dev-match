const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

// add user dynamically in the database
app.post("/signup" , async (req, res) => {
  // creating a new instance of the user model
  const user = new User(req.body);

  await user.save();
  res.send("user added successfully");
});

// find a user by their email id
app.get("/user" , async(req, res) =>{
  const userEmail = req.body.emailId;

  try{
    console.log(userEmail);
    const user = await User.findOne({emailId : userEmail});
    if(!user) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch(err){
    res.status(400).send("something went wrong");
  }
});

// get all the users from database
app.get("/feed" , async(req, res) => {
  try{
    const user = await User.find({});
    res.send(user);
  } catch(err){
    res.status(400).send("something went wrong");
  }
});

app.delete("/user" , async(req, res) => {

  const userId = req.body.userId ;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch(err){
    res.status(400).send("something went wrong");
  }
});

app.patch("/user" , async(req, res) => {

  const userId = req.body.userId ;
  const data = req.body ;
  try{
    const user = await User.findByIdAndUpdate(userId , data, {
      returnDocument : "after",
      runValidators : true
    });
    console.log(user);
    res.send("user updated  successfully");
  } catch(err){
    res.status(400).send("something went wrong");
  }
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
