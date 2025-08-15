const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

// add user dynamically in the database
app.post("/signup" , async (req, res) => {
  try{// validate
    validateSignUpData(req);

    const {firstName, lastName, emailId, password} = req.body;

    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // creating a new instance of the user model
    const user = new User(
      {
        firstName, 
        lastName,
        emailId,
        password : passwordHash
    }
    );

    await user.save();
    res.send("user added successfully");
  } catch(err) {
    res.status(400).send("error : " + err.message);
  }
});

app.post("/login", async(req,res) => {
  try {
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId : emailId});
    if(!user) {
      throw new Error("invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password , user.password );

    if(isPasswordValid){
      res.send("user login successfully");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
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

app.patch("/user/:userId" , async(req, res) => {

  const userId = req.params?.userId ;
  const data = req.body ;

  try{
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills"
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
    {
      ALLOWED_UPDATES.includes(k)
    });
    if (!isUpdateAllowed){
      throw new Error("update not allowed")
    }

    if(data?.skills.length > 10) {
      throw new Error("skills cannot be more than 10");
    }

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
