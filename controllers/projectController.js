const Project = require("../models/projectModel");
const userController = require("./userController");

// POST
// find the number of existing projects in db with count
// creates new projects with user who auth request, and position of new proj in list
// success: 201 created res with new proj {} as JSON
// error: 500 internal server error res with error {} as JSON
let userId = "";

const create = async (req, res) => {
  userId = userController.userId;
  console.log("projectController.js - create function - userId:\n", userId);
  try {
    const projectsCount = await Project.find().count();
    const project = await Project.create({
      user: userId,
      position: projectsCount > 0 ? projectsCount : 0
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET
// final all proj belonging to auth user
// calling find method by querying user id
// shows result in descending order
// sucess: 200 OK res with [] of proj as JSON
// error: 500 internal server error with error {} as JSON
const getAll = async (req, res) => {
  try {
    userId = userController.userId;
    const projects = await Project.find({ user: userId }).sort("-position");
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { create, getAll };
