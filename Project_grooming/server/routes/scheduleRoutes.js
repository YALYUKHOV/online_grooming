const Router = require('express');
const router = Router();
const scheduleController = require('../controllers/scheduleController');


router.post('/', scheduleController.create)
router.get('/', scheduleController.getAll)
router.delete('/:id', scheduleController.deleteOne)
router.put('/:id', scheduleController.updateOne)

module.exports = router;