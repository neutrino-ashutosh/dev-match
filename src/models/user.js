const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

// ConnectionRequest.find({fromUserId : 294524653784593645 , toUserId : 432756023784150857});

// connectionRequestSchema.index({fromUserId : 1, toUserId : 1});

// userSchema.index({ firstName : 1, lastName : 1});

userSchema.methods.getJWT = async function () {
  const user = this ;
  const token = await jwt.sign({_id : user._id}, "AshuAakansha$@2119", {
    expiresIn : "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this ;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid ;
}

module.exports = mongoose.model("User", userSchema );
// module.exports = User;
