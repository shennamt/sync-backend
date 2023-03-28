const express = require("express");
const router = express.Router();
const Kanban = require("../models/Kanban.js");

// KANBAN - Display Edit Kanban Page
router.get("/:id/kanban/edit", async (req, res) => {
  try {
    const foundKanban = await Kanban.findById(req.params.id);
    res.render("editProjectsKanban.ejs", {
      kanban: foundKanban // pass in found project
    });
  } catch (error) {
    console.log(error);
  }
});

// KANBAN - Update Kanban
router.put("/:id", async (req, res) => {
  if (req.body.kanban === "on") {
    req.body.kanban = true;
  } else {
    req.body.kanban = false;
  }
  try {
    const updatedKanban = await Kanban.findByIdAndUpdate(
      req.params.id,
      req.body
      // { new: true }
    );
    res.send(updatedKanban);
    // res.redirect("/kanban/:id");
  } catch (error) {
    console.log(error);
  }
});

// PROJECT - Delete Project
// router.delete("/:id", async (req, res) => {
//   try {
//     const removeProject = await Project.findByIdAndDelete(req.params.id);
//     console.log(removeProject);
//     res.redirect("/projects"); // redirect back to projects index
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
