// dependencies //////////////////////////////////////////////////////////////////

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Include dotenv
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

// Include the method-override package
const methodOverride = require("method-override");

// const signup = require("./model/signupmodel.js");
// const cors = require("cors");
// const signupRoute = require("./routes/signuproutes");
// const userRoute = require("./routes/userroute");

// const whitelist = ["http://localhost:3000"];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

// Middleware //////////////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: true })); // body parser
// app.use(express.static("public"));
// app.use(express.json());
// app.use(cors(corsOptions));

//connection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect("mongodb://127.0.0.1:27017/sync", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

//routes
// app.use("/api/user", signupRoute);
// app.use("/api/user", userRoute);

//listen for request
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}.`);
});
