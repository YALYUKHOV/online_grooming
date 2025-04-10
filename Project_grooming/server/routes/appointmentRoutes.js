const Router = require('express');
const router = Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, appointmentController.create);
router.get('/', authMiddleware, appointmentController.getAll);
router.delete('/:id', authMiddleware, appointmentController.deleteOne);
router.put('/:id', authMiddleware, appointmentController.updateOne);

module.exports = router;