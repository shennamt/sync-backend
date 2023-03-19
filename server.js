// dependencies //////////////////////////////////////////////////////////////////

const express = require("express");
const app = express();
const PORT = 4500;
const mongoose = require("mongoose");
const signup = require("./models/SignUp.js");
const cors = require("cors");

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

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});

mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

//...farther down the page

mongoose.connect("mongodb://127.0.0.1:27017/signup", {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

// post route
app.post("http://localhost:4500/", async (req, res) => {
  try {
    const createdSignUp = await signup.create(req.body);
    res.status(200).send(createdSignUp);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/", (req, res) => {
  res.send("Hello " + PORT);
});
