// dependencies //////////////////////////////////////////////////////////////////

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Include dotenv
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

// Include the method-override package
const methodOverride = require("method-override");

const Project = require("./models/Project.js");

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
app.use(methodOverride("_method"));
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

app.get("/projects", async (req, res) => {
  try {
    const allProjects = await Project.find({});
    res.render("index.ejs", { projects: allProjects });
  } catch (error) {
    console.log(error);
  }
});

app.get("/projects/new", (req, res) => {
  res.render("new.ejs");
});

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

app.get("/projects/:id", async (req, res) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    // res.send(foundProject);
    res.render("show.ejs", {
      project: foundProject
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/projects/:id", async (req, res) => {
  // res.send("deleting...");
  // using try method for external systems, so that we can stop any errors.
  try {
    const removeProject = await Project.findByIdAndDelete(req.params.id);
    console.log(removeProject);
    res.redirect("/projects"); // redirect back to projects index
  } catch (error) {
    console.log(error);
  }
});

app.get("/projects/:id/edit", async (req, res) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    res.render("edit.ejs", {
      project: foundProject // pass in found project
    });
  } catch (error) {
    console.log(error);
  }
});

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

//listen for request
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}.`);
});
