const express = require("express");
const router = express.Router();
const Project = require("../models/Project.js");
const Kanban = require("../models/Kanban.js");

// PROJECT - Display/Read Index
router.get("/", async (req, res) => {
  try {
    const allProjects = await Project.find({});
    const allKanban = await Kanban.find({});
    res.render("indexProjects.ejs", {
      projects: allProjects,
      kanban: allKanban
    });
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
    const foundKanban = await Kanban.findById(req.params.id);
    // res.send(foundProject);
    res.render("showProjects.ejs", {
      project: foundProject,
      kanban: foundKanban
    });
  } catch (error) {
    console.log(error);
  }
});

// PROJECT - Display Edit Project Page
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
    console.log("updatedProject:", updatedProject);
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

// KANBAN - Display Edit Kanban Page
router.get("/:id/editKanban", async (req, res) => {
  try {
    const foundKanban = await Kanban.findById(req.params.id);
    res.render("editProjectsKanban.ejs", {
      kanban: foundKanban // pass in found kanban
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id/kanban", async (req, res) => {
  if (req.body.todo !== "") {
    req.body.tasksAssigned = true;
  } else {
    req.body.tasksAssigned = false;
  }
  try {
    const updatedKanban = await Kanban.findByIdAndUpdate(
      req.params.id,
      req.body
      // { new: true }
    );
    // res.send(updatedProject);
    console.log("updatedKanban:", updatedKanban);
    res.redirect("/projects");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
