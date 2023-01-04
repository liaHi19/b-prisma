const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");

const app = express();
require("dotenv").config();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie middleware
app.use(cookieParser());

//routes
app.use("/api", userRouter);
app.use("/api", postRouter);

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
