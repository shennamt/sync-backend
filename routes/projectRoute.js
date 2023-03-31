// prettier-ignore
const express = require('express')
const router = express.Router();
const projectController = require("../controllers/projectController");

// 'POST' route that handles requests to create a new project
// when a POST request is received at the root endpoint ("/"), the router
// forwards the request to the create function of a projectController
router.post("/", projectController.create);
router.get("/", projectController.getAll);

module.exports = router;
