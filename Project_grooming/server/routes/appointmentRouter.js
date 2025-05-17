const Router = require('express');
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

// Получение доступных дат
router.get('/available-dates', authMiddleware, appointmentController.getAvailableDates);

// Создание новой записи
router.post('/', authMiddleware, appointmentController.create);

// Получение записей пользователя
router.get('/', authMiddleware, appointmentController.getUserAppointments);

module.exports = router; 