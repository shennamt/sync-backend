const router = require('express').Router()
const projectController = require('../controllers/projectController')

router.post(
  '/projects',
  projectController.create
)

router.get(
  '/projects',
  projectController.getAll
)

module.exports = router