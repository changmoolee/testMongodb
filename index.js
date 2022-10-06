require("dotenv").config({ path: ".env" });
const MONGODB_URL = process.env.MONGODB_URL;

const cors = require("cors");

const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "@signupapp",
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: "localhost",
      path: "/",
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: "none",
      // httpOnly: false,
      secure: true,
    },
  })
);

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
