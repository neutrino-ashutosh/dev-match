const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName : {
      type : String,
      required : true,
      minLength : 4,
      maxLength : 50
    }, 
    lastName : {
      type : String
    }, 
    emailId : {
      type  : String,
      required : true,
      lowercase : true,
      unique : true,
      trim : true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid email address: " + value);
        }
      }

    }, 
    password : {
      type : String,
      required : true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("enter a strong password : " + value);
        }
      }
    }, 
    age : {
      type : Number ,
      min : 16
    }, 
    gender : {
      type : String ,
      validate(value) {
        if( !["male", "female" , "others" ].includes(value)) {
          throw new Error("gender data is not valid");
        }
      }
    },
    photoUrl : {
      type : String,
      default : "https://media.istockphoto.com/id/1095289632/vector/purple-user-icon-in-the-circle-a-solid-gradient.jpg?s=612x612&w=0&k=20&c=35BA2rH_fHDkiSlCyJXzvofllOyvNdc9V-VZzZQxzD4=",
      validate(value){
        if(!validator.isURL(value)){
          throw new Error("Invalid photo url: " + value);
        }
      }
    },
    about : {
      type : String,
      default : "hey, i am using devMatch"
    },
    skills : {
      type : [String]
    },
  }, 
  {
    timestamps : true
  }
);

module.exports = mongoose.model("User", userSchema );
// module.exports = User;
