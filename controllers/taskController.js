const Task = require('../models/taskModel')
const Column = require('../models/columnModel')

exports.create = async (req, res) => {
  const { columnId } = req.body
  try {
    const column = await Column.findById(columnId)
    const tasksCount = await Task.find({ column: columnId }).count()
    const task = await Task.create({
      column: columnId,
      position: tasksCount > 0 ? tasksCount : 0
    })
    task._doc.column = column
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.update = async (req, res) => {
  const { taskId } = req.params
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { $set: req.body }
    )
    res.status(200).json(task)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.delete = async (req, res) => {
  const { taskId } = req.params
  try {
    const currentTask = await Task.findById(taskId)
    await Task.deleteOne({ _id: taskId })
    const tasks = await Task.find({ column: currentTask.column }).sort('postition')
    for (const key in tasks) {
      await Task.findByIdAndUpdate(
        tasks[key].id,
        { $set: { position: key } }
      )
    }
    res.status(200).json('deleted')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updatePosition = async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceColumnId,
    destinationColumnId
  } = req.body
  const resourceListReverse = resourceList.reverse()
  const destinationListReverse = destinationList.reverse()
  try {
    if (resourceColumnId !== destinationColumnId) {
      for (const key in resourceListReverse) {
        await Task.findByIdAndUpdate(
          resourceListReverse[key].id,
          {
            $set: {
              column: resourceColumnId,
              position: key
            }
          }
        )
      }
    }
    for (const key in destinationListReverse) {
      await Task.findByIdAndUpdate(
        destinationListReverse[key].id,
        {
          $set: {
            column: destinationColumnId,
            position: key
          }
        }
      )
    }
    res.status(200).json('updated')
  } catch (err) {
    res.status(500).json(err)
  }
}