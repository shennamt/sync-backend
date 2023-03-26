// dependencies //////////////////////////////////////////////////////////////////
require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const cors = require("cors");

// const userRoute = require("./routes/user");

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: "*"
};

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// Middleware; //////////////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: false })); // body parser
app.use(express.static("public"));
app.use(express.json());

// app.use(cors(corsOptions));
//listen; //////////////////////////////////////////////////////////////////

//connection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

//routes

// app.use("/api/user", userRoute);

//listen for request
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
