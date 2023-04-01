const router = require('express').Router({ mergeParams: true })
const { param, body } = require('express-validator')
const tokenHandler = require('../handlers/tokenHandler')
const validation = require('../handlers/validation')
const taskController = require('../controllers/taskController')

router.post(
  '/',
  param('projectId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid project id')
    } else return Promise.resolve()
  }),
  body('projectId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid project id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.create
)

router.put(
  '/update-position',
  param('projectId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid project id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updatePosition
)

router.delete(
  '/:taskId',
  param('projectId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid project id')
    } else return Promise.resolve()
  }),
  param('taskId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid task id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.delete
)

router.put(
  '/:taskId',
  param('projectId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid project id')
    } else return Promise.resolve()
  }),
  param('taskId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid task id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.update
)

module.exports = router