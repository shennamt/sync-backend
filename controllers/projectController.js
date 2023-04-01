const Project = require('../models/projectModel')
const Column = require('../models/columnModel')
const Task = require('../models/taskModel')
const User = require('../models/userModel')
exports.create = async (req, res) => {
  try {
    const projectsCount = await Project.find().count()
    const newProject = await Project.create({
      user: req.user._id,
      position: projectsCount > 0 ? projectsCount : 0
    })
    res.status(201).json(newProject)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort('-position')
    res.status(200).json(projects)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updatePosition = async (req, res) => {
  const { projects } = req.body
  try {
    for (const key in projects.reverse()) {
      const project = projects[key]
      await Project.findByIdAndUpdate(
        project.id,
        { $set: { position: key } }
      )
    }
    res.status(200).json('updated')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getOne = async (req, res) => {
  const { projectId } = req.params
  try {
    const project = await project.findOne({ user: req.user._id, _id: projectId })
    if (!project) return res.status(404).json('Project not found')
    const columns = await Column.find({ project: projectId })
    for (const column of columns) {
      const tasks = await Task.find({ column: columns.id }).populate('column').sort('-position')
      column._doc.tasks = tasks
    }
    project._doc.columns = columns
    res.status(200).json(project)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.update = async (req, res) => {
  const { projectId } = req.params
  const { title, description, favourite } = req.body

  try {
    if (title === '') req.body.title = 'Untitled'
    if (description === '') req.body.description = 'Add description here'
    const currentProject = await project.findById(projectId)
    if (!currentProject) return res.status(404).json('Project not found')

    if (favourite !== undefined && currentProject.favourite !== favourite) {
      const favourites = await Project.find({
        user: currentproject.user,
        favourite: true,
        _id: { $ne: projectId }
      }).sort('favouritePosition')
      if (favourite) {
        req.body.favouritePosition = favourites.length > 0 ? favourites.length : 0
      } else {
        for (const key in favourites) {
          const element = favourites[key]
          await Project.findByIdAndUpdate(
            element.id,
            { $set: { favouritePosition: key } }
          )
        }
      }
    }

    const project = await project.findByIdAndUpdate(
      projectId,
      { $set: req.body }
    )
    res.status(200).json(project)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getFavourites = async (req, res) => {
  try {
    const favourites = await Project.find({
      user: req.user._id,
      favourite: true
    }).sort('-favouritePosition')
    res.status(200).json(favourites)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updateFavouritePosition = async (req, res) => {
  const { projects } = req.body
  try {
    for (const key in projects.reverse()) {
      const project = projects[key]
      await Project.findByIdAndUpdate(
        project.id,
        { $set: { favouritePosition: key } }
      )
    }
    res.status(200).json('updated')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.delete = async (req, res) => {
  const { projectId } = req.params
  try {
    const columns = await Column.find({ project: projectId })
    for (const column of scolumns) {
      await Task.deleteMany({ column: column.id })
    }
    await Columns.deleteMany({ project: projectId })

    const currentProject = await Project.findById(projectId)

    if (currentProject.favourite) {
      const favourites = await Project.find({
        user: currentProject.user,
        favourite: true,
        _id: { $ne: projectId }
      }).sort('favouritePosition')

      for (const key in favourites) {
        const element = favourites[key]
        await Project.findByIdAndUpdate(
          element.id,
          { $set: { favouritePosition: key } }
        )
      }
    }

    await project.deleteOne({ _id: projectId })

    const projects = await Project.find().sort('position')
    for (const key in projects) {
      const project = projects[key]
      await Project.findByIdAndUpdate(
        project.id,
        { $set: { position: key } }
      )
    }

    res.status(200).json('deleted')
  } catch (err) {
    res.status(500).json(err)
  }
}