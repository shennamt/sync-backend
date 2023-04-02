var router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/projects', require('./project'))
router.use('/projects/:projectId/columns', require('./column'))
router.use('/projects/:projectId/tasks', require('./task'))

module.exports = router;