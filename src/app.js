const express = require("express");
const app = express();

app.use("/profile",(req, res) => {
  res.send("hello from the server");
})

app.use("/test",(req, res) => {
  res.send("hello from the test server");
})

app.listen(3000 , () => {
  console.log("server is successsfully listening on port 3000...");
});