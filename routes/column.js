const router = require('express').Router({ mergeParams: true })
const { param } = require('express-validator')
const tokenHandler = require('../handlers/tokenHandler')
const columnController = require('../controllers/columnController')
const validation = require('../handlers/validation')

router.post(
  '/',
  param('projectId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  columnController.create
)

router.put(
  '/:columnId',
  param('projectdId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid project id')
    } else return Promise.resolve()
  }),
  param('columnId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid column id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  columnController.update
)

router.delete(
  '/:columnId',
  param('columnId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid column id')
    } else return Promise.resolve()
  }),
  param('columnId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid column id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  columnController.delete
)

module.exports = router