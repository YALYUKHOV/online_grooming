const Router = require('express');
const router = Router();
const appointmentController = require('../controllers/appointmentController');



router.post('/', appointmentController.create)
router.get('/', appointmentController.getAll)
router.delete('/:id', appointmentController.deleteOne)
router.put('/:id', appointmentController.updateOne)

module.exports = router;