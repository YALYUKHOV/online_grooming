const Router = require('express');
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');
const appointmentController = require('../controllers/appointmentController');
const { validateRegistration, validateLogin, validateChangePassword } = require('../middleware/validationMiddleware');

const router = new Router();

// Авторизация
router.post('/registration', validateRegistration, clientController.registration);
router.post('/login', validateLogin, clientController.login);
router.post('/refresh', clientController.refresh);
router.get('/check', authMiddleware, clientController.check);
router.post('/logout', authMiddleware, clientController.logout);

// Записи клиента
router.get('/appointments', authMiddleware, appointmentController.getUserAppointments);
router.post('/appointments', authMiddleware, appointmentController.create);
router.get('/available-dates', authMiddleware, appointmentController.getAvailableDates);

module.exports = router;
