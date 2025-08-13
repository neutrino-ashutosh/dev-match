const express = require("express");
const app = express();

// app.use("/profile",(req, res) => {
//   res.send("hello from the server");
// })

// app.use("/test",(req, res) => {
//   res.send("hello from the test server");
// })

app.get("/user" , (req, res) => {
  res.send("data fetched successfully");
});

app.post("/user" , (req, res) => {
  res.send("data posted successfully");
});

app.delete("/user" , (req, res) => {
  res.send("data deleted successfully");
});

app.use("/",(req, res) => {
  res.send("welcome on server");
})

app.listen(3000 , () => {
  console.log("server is successsfully listening on port 3000...");
});