const router = express.Router();
const { create, getAll } = require('../controllers/projectController')

router.post('/projects', create)

router.get('/projects', projectController.getAll)

module.exports = router