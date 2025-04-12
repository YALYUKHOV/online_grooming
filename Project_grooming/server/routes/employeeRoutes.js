const Router = require('express');
const router = Router();
const employeeController = require('../controllers/employeeController');


router.post('/', employeeController.create)
router.get('/', employeeController.getAll)
router.delete('/:id', employeeController.deleteOne)
router.put('/:id', employeeController.updateOne)
router.get('/appointments/:id', employeeController.getEmployeeAppointments)

module.exports = router;
