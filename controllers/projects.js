const express = require("express");
const router = express.Router();
const Project = require("../models/Project.js");
const Kanban = require("../models/Kanban.js");

// PROJECT - Display/Read Index
router.get("/", async (req, res) => {
  try {
    const allProjects = await Project.find({});
    res.render("indexProjects.ejs", { projects: allProjects });
  } catch (error) {
    console.log(error);
  }
});

// PROJECT - Display/Read New Project
router.get("/new", (req, res) => {
  res.render("newProjects.ejs");
});

// PROJECT - Create New Project and Kanban
router.post("/", async (req, res) => {
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
    const kanban = new Kanban({ _id: project.id });
    await kanban.save();
    console.log("project", project);
    console.log("kanban", kanban);
    res.redirect("/projects");
  } catch (error) {
    console.log(error);
  }
});

// PROJECT - Display/Read Each Project
router.get("/:id", async (req, res) => {
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
router.get("/:id/edit", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  try {
    const removeProject = await Project.findByIdAndDelete(req.params.id);
    console.log(removeProject);
    res.redirect("/projects"); // redirect back to projects index
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
