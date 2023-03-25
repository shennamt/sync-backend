// dependencies //////////////////////////////////////////////////////////////////

const express = require("express");
const app = express();
const PORT = 4500;
const mongoose = require("mongoose");
const signup = require("./model/signupmodel.js");
const cors = require("cors");
const signupRoute = require("./routes/signuproutes");
const userRoute = require("./routes/userroute");

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Middleware //////////////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: false })); // body parser
app.use(express.static("public"));
app.use(express.json());
app.use(cors(corsOptions));

//listen; //////////////////////////////////////////////////////////////////

//connection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect("mongodb://127.0.0.1:27017/SYNC", {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

//routes
app.use("/api/user", signupRoute);
app.use("/api/user", userRoute);

//listen for request
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
