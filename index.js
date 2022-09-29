require("dotenv").config({ path: ".env" });
const MONGODB_URL = process.env.MONGODB_URL;

const cors = require("cors");

const express = require("express");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

const userRouter = require("./routes/User");
app.use(express.json());
// 매우 중요...
app.use("/user", userRouter);
const User = require("./models/User");

app.get("/user", (req, res) => {
  res.json({ message: "success!" });
});

User.find((error, user) => {
  console.log("--- Read all ---");
  if (error) {
    console.log(error);
  } else {
    console.log(user);
  }
});

const port = 8000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    const mongoose = require("mongoose");

    mongoose
      .connect(MONGODB_URL, { useNewUrlParser: true })
      .then(() => console.log("connected"))
      .catch((err) => console.log("failed connection cause", err));
  }
});
