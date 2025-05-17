const Router = require('express');
const router = Router();
const appointmentRoutes = require('./appointmentRoutes');
const clientRoutes = require('./clientRoutes');
const employeeRoutes = require('./employeeRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const serviceRoutes = require('./serviceRoutes');

// Основные роуты
router.use('/appointment', appointmentRoutes);
router.use('/client', clientRoutes);
router.use('/employee', employeeRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/service', serviceRoutes);

module.exports = router;