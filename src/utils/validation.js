const validator  = require("validator");

const validateSignUpData = (req) => {
  const {firstName, lastName, emailId, password} = req.body;
  console.log(firstName);
  if(!firstName){
    throw new Error("name is not valid");
  }
  else if(!validator.isEmail(emailId)){
    throw new Error("please enter a valid email");
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("please enter a strong password");
  }
  
}

module.exports = {validateSignUpData};