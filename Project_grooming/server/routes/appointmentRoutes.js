const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const router = express.Router();

router.get('/', appointmentController.getAllAppointments);
router.post('/', appointmentController.createAppointment);
router.get('/:id', appointmentController.getAppointmentById);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
