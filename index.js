require("dotenv").config({ path: ".env" });
const MONGODB_URL = process.env.MONGODB_URL;

const cors = require("cors");

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");

// const FireStore = require("session-file-store")(session);
const MongoStore = require("connect-mongo");

const app = express();
const fileStoreOptions = {};

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(
  session({
    store: MongoStore.create({ mongoUrl: MONGODB_URL }),
    secret: "@signupapp",
    resave: false,
    saveUninitialized: true,
    name: "userId",
    cookie: {
      path: "/",
      maxAge: null,
      sameSite: false,
      secure: false,
      httpOnly: true,
    },
  })
);

const userRouter = require("./routes/User");
// 매우 중요...
app.use("/user", userRouter);

const port = 8000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    mongoose
      .connect(MONGODB_URL, { useNewUrlParser: true })
      .then(() => console.log("connected"))
      .catch((err) => console.log("failed connection cause", err));
  }
});
