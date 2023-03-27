// dependencies //////////////////////////////////////////////////////////////////
require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const cors = require("cors");

const usersController = require("./controllers/users.js");
const projectsController = require("./controllers/projects.js");

// Include the method-override package
const methodOverride = require("method-override");

const userRoute = require("./routes/user");

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

const Project = require("./models/Project.js");

// Middleware; //////////////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: true })); // body parser
app.use(express.static("public"));
app.use(express.json());
app.use(methodOverride("_method")); // for update and delete purpose

app.use(cors(corsOptions));

app.use("/users", usersController);
app.use("/projects", projectsController);

//listen; //////////////////////////////////////////////////////////////////

//connection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

// changed mongodb due the following error
// Error - trying to access database from an IP that isn't whitelisted
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

//routes

app.use("/api/user", userRoute);

// MAIN - Display App Routes
app.get("/", async (req, res) => {
  try {
    res.render("main.ejs");
  } catch (error) {
    console.log(error);
  }
});

//listen for request
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
