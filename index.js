// dependencies //////////////////////////////////////////////////////////////////
require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const cors = require("cors");

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

const User = require("./models/userModel.js");
const Project = require("./models/Project.js");

// Middleware; //////////////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: true })); // body parser
app.use(express.static("public"));
app.use(express.json());
app.use(methodOverride("_method")); // for update and delete purpose

app.use(cors(corsOptions));
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

// USER - Display/Read Index
app.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.render("indexUsers.ejs", { users: allUsers });
  } catch (error) {
    console.log(error);
  }
});

// USER - Display/Read New User
app.get("/users/new", (req, res) => {
  res.render("newUsers.ejs");
});

// USER - Create New User
app.post("/users/", async (req, res) => {
  if (req.body.student === "on") {
    // if checked, req.body.student is set to 'on'
    req.body.student = true;
  } else {
    // if not checked, req.body.student is undefined
    req.body.student = false;
  }
  if (req.body.professional === "on") {
    // if checked, req.body.professional is set to 'on'
    req.body.professional = true;
  } else {
    // if not checked, req.body.professional is undefined
    req.body.professional = false;
  }
  try {
    const user = await User.create(req.body);
    // console.log(user);
    res.redirect("/users");
  } catch (error) {
    console.log(error);
  }
});

// USER - Display/Read Each User
app.get("/users/:id", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.render("showUsers.ejs", {
      user: foundUser
    });
  } catch (error) {
    console.log(error);
  }
});

// USER - Display Edit User Page
app.get("/users/:id/edit", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.render("editUsers.ejs", {
      user: foundUser // pass in found project
    });
    console.log("foundUser -", foundUser);
  } catch (error) {
    console.log(error);
  }
});

// USER - Update User
app.put("/users/:id", async (req, res) => {
  if (req.body.student === "on") {
    req.body.student = true;
  } else {
    req.body.student = false;
  }
  if (req.body.professional === "on") {
    req.body.professional = true;
  } else {
    req.body.professional = false;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body
      // { new: true }
    );
    console.log("updatedUser -", updatedUser);
    res.redirect("/users");
  } catch (error) {
    console.log(error);
  }
});

// USER - Delete User
app.delete("/users/:id", async (req, res) => {
  try {
    const removeUser = await User.findByIdAndDelete(req.params.id);
    console.log(removeUser);
    res.redirect("/users"); // redirect back to users index
  } catch (error) {
    console.log(error);
  }
});

// PROJECT - Display/Read Index
app.get("/projects", async (req, res) => {
  try {
    const allProjects = await Project.find({});
    res.render("indexProjects.ejs", { projects: allProjects });
  } catch (error) {
    console.log(error);
  }
});

// PROJECT - Display/Read New Project
app.get("/projects/new", (req, res) => {
  res.render("newProjects.ejs");
});

// PROJECT - Create New Project
app.post("/projects/", async (req, res) => {
  if (req.body.agile === "on") {
    // if checked, req.body.agile is set to 'on'
    req.body.agile = true;
  } else {
    // if not checked, req.body.agile is undefined
    req.body.agile = false;
  }
  if (req.body.kanban === "on") {
    // if checked, req.body.kanban is set to 'on'
    req.body.kanban = true;
  } else {
    // if not checked, req.body.kanban is undefined
    req.body.kanban = false;
  }
  try {
    const project = await Project.create(req.body);
    // console.log(project);
    res.redirect("/projects");
  } catch (error) {
    console.log(error);
  }
});

// PROJECT - Display/Read Each Project
app.get("/projects/:id", async (req, res) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    // res.send(foundProject);
    res.render("showProjects.ejs", {
      project: foundProject
    });
  } catch (error) {
    console.log(error);
  }
});

// PROJECT - Display Edit User Page
app.get("/projects/:id/edit", async (req, res) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    res.render("editProjects.ejs", {
      project: foundProject // pass in found project
    });
  } catch (error) {
    console.log(error);
  }
});

// PROJECT - Update Project
app.put("/projects/:id", async (req, res) => {
  if (req.body.agile === "on") {
    req.body.agile = true;
  } else {
    req.body.agile = false;
  }
  if (req.body.kanban === "on") {
    req.body.kanban = true;
  } else {
    req.body.kanban = false;
  }
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body
      // { new: true }
    );
    // res.send(updatedProject);
    res.redirect("/projects");
  } catch (error) {
    console.log(error);
  }
});

// PROJECT - Delete Project
app.delete("/projects/:id", async (req, res) => {
  try {
    const removeProject = await Project.findByIdAndDelete(req.params.id);
    console.log(removeProject);
    res.redirect("/projects"); // redirect back to projects index
  } catch (error) {
    console.log(error);
  }
});

//listen for request
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
