const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

//  Get all the pending connection request for the logged in user
userRouter.get("/user/requests/received", userAuth ,async (req, res) =>{
  try{
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequest.find({
      toUserId: loggedInUser._id,
      status:" interested",
    }).populate(
      "fromUserId", 
      ["firstName", "lastName", "photoUrl", "age", "about"]
    );

    res.json({
      message : "data fetched successfully",
      data : connectionRequests,
    })
  }catch(err){
    req.statusCode(400).send("Error : " + err.message);
  }
})

module.exports = userRouter;