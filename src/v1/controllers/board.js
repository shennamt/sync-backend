const Board = require("../models/board");
const Section = require("../models/section");
const Task = require("../models/task");

exports.create = async (req, res) => {
  try {
    const boardsCount = await Board.find().count();
    const board = await Board.create({
      user: req.user._id,
      position: boardsCount > 0 ? boardsCount : 0
    });
    res.status(201).json(board);
  } catch (err) {
    console.log("controllers/board.js: err\n", err);
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id }).sort("-position");
    res.status(200).json(boards);
  } catch (err) {
    console.log("controllers/board.js: err\n", err);
    res.status(500).json(err);
  }
};

exports.updatePosition = async (req, res) => { // PUT req to update position
  const { boards } = req.body // destructure board prop form req
  try {
    for (const key in boards.reverse()) { // rev and iterate loop to update its position
      const board = boards[key]
      await Board.findByIdAndUpdate(
        board.id,
        { $set: { position: key } }
      )
    }
    res.status(200).json('updated')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getOne = async (req, res) => { // GET rew for specific board by ID
  const { boardId } = req.params
  try {
    const board = await Board.findOne({ user: req.user._id, _id: boardId }) // based on board and user id
    if (!board) return res.status(404).json('Board not found')
    const sections = await Section.find({ board: boardId }) // if found, retrieves sections
    for (const section of sections) {
      const tasks = await Task.find({ section: section.id }).populate('section').sort('-position') // for each section, find tasks
      section._doc.tasks = tasks // doc is a mongoose prop. access plain js {}.
    }
    board._doc.sections = sections
    res.status(200).json(board)
  } catch (err) {
    res.status(500).json(err)
  }
}