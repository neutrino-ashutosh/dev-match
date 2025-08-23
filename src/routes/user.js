const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photourl age gender about skills";

//  Get all the pending connection request for the logged in user
userRouter.get("/user/requests/received", userAuth ,async (req, res) =>{
  try{
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequest.find({
      toUserId: loggedInUser._id,
      status:" interested",
    }).populate(
      "fromUserId", 
      USER_SAFE_DATA
    );

    res.json({
      message : "data fetched successfully",
      data : connectionRequests,
    })
  }catch(err){
    req.statusCode(400).send("Error : " + err.message);
  }
})

userRouter.get("/user/connections", userAuth, async(req,res) =>{
  try{
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        {toUserId : loggedInUser._id, status: "accepteed"},
        {fromUserId : loggedInUser._id, status: "accepteed"}
      ],
    }).populate("fromUserId", USER_SAFE_DATA );

    const data = connectionRequests.map((row) => row.fromUserId);

    res.json({ data : connectionRequests});

  } catch (err) {
    req.statusCode(400).send("message: "+ err.message);
  }
})

module.exports = userRouter;