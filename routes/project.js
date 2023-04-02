const router = require('express').Router()
const { param } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const projectController = require('../controllers/projectController')

router.post(
  '/',
  tokenHandler.verifyToken,
  projectController.create
)

router.get(
  '/',
  tokenHandler.verifyToken,
  projectController.getAll
)

router.put(
  '/',
  tokenHandler.verifyToken,
  projectController.updatePosition
)

router.get(
  '/favourites',
  tokenHandler.verifyToken,
  projectController.getFavourites
)

router.put(
  '/favourites',
  tokenHandler.verifyToken,
  projectController.updateFavouritePosition
)

router.get(
  '/:projectId',
  param('projectId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  projectController.getOne
)

router.put(
  '/:projectId',
  param('projectId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  projectController.update
)

router.delete(
  '/:projectId',
  param('projectId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  projectController.delete
)


module.exports = router