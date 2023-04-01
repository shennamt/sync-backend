const Column = require('../models/columnModel')
const Task = require('../models/taskModel')

exports.create = async (req, res) => {
  const { projectId } = req.params
  try {
    const column = await Column.create({ project: projectId })
    column._doc.tasks = []
    res.status(201).json(column) // submitted
  } catch (err) {
    res.status(500).josn(err) // internal server error
  }
}

exports.update = async (req, res) => {
  const { columnId } = req.params
  try {
    const column = await Column.findByIdAndUpdate(
      columnId,
      { $set: req.body }
    )
    column._doc.tasks = []
    res.status(200).json(column) // submitted
  } catch (err) {
    res.status(500).josn(err) // internal server error
  }
}

exports.delete = async (req, res) => {
  const { columnId } = req.params
  try {
    await Task.deleteMany({ column: columnId })
    await Column.deleteOne({ _id: columnId })
    res.status(200).json('deleted')
  } catch (err) {
    res.status(500).josn(err)
  }
}