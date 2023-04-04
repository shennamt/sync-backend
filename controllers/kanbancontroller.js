const { Project } = require('../models/project');

const createProject = async (req, res) => {
  try {
    const project = new Project({

      const { title } = req.body;
      // Extract data from request body and set in project object
      // Example: title: req.body.title
    });

    const result = await project.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project.' });
  }
};

module.exports = {
  createProject,
};
