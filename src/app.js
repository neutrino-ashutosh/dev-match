const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
  origin : "http://localhost:5173",
  credentials : true ,
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/" , authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// app.get("/user" , async(req, res) =>{
//   const userEmail = req.body.emailId;

//   try{
//     console.log(userEmail);
//     const user = await User.findOne({emailId : userEmail});
//     if(!user) {
//       res.status(404).send("user not found");
//     } else {
//       res.send(user);
//     }
//   } catch(err){
//     res.status(400).send("something went wrong");
//   }
// });

// get all the users fr

// app.delete("/user" , async(req, res) => {

//   const userId = req.body.userId ;
//   try{
//     const user = await User.findByIdAndDelete(userId);
//     res.send("user deleted successfully");
//   } catch(err){
//     res.status(400).send("something went wrong");
//   }
// });

// app.patch("/user/:userId" , async(req, res) => {

//   const userId = req.params?.userId ;
//   const data = req.body ;

//   try{
//     const ALLOWED_UPDATES = [
//       "photoUrl",
//       "about",
//       "gender",
//       "age",
//       "skills"
//     ];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//     {
//       ALLOWED_UPDATES.includes(k)
//     });
//     if (!isUpdateAllowed){
//       throw new Error("update not allowed")
//     }

//     if(data?.skills.length > 10) {
//       throw new Error("skills cannot be more than 10");
//     }

//     const user = await User.findByIdAndUpdate(userId , data, {
//       returnDocument : "after",
//       runValidators : true
//     });
//     console.log(user);
//     res.send("user updated  successfully");
//   } catch(err){
//     res.status(400).send("something went wrong");
//   }
// });

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
