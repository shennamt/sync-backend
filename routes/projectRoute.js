const router = require('express').Router()
// might need to add a validator
// which the validation need a handler
// and a token handler as well
const projectController = require('../controllers/projectController')

const requireAuth = require("../middleware/requireAuth")

router.post(
  '/',
  projectController.create

)

router.get(
  '/',
  projectController.getAll
)