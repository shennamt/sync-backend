const express = require("express");
const router = express.Router();
const Project = require("../models/Project.js");

// PROJECT - Display/Read Index
app.get("/", async (req, res) => {
  try {
    const allProjects = await Project.find({});
    res.render("indexProjects.ejs", { projects: allProjects });
  } catch (error) {
    console.log(error);
  }
});

// PROJECT - Display/Read New Project
app.get("/new", (req, res) => {
  res.render("newProjects.ejs");
});

// PROJECT - Create New Project
app.post("/", async (req, res) => {
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
app.get("/:id", async (req, res) => {
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
app.get("/:id/edit", async (req, res) => {
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
app.put("/:id", async (req, res) => {
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
app.delete("/:id", async (req, res) => {
  try {
    const removeProject = await Project.findByIdAndDelete(req.params.id);
    console.log(removeProject);
    res.redirect("/projects"); // redirect back to projects index
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
