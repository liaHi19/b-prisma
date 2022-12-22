const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
