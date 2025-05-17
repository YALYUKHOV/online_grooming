const Router = require('express');
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

// Получение всех услуг
router.get('/', authMiddleware, serviceController.getAll);

// Получение услуги по id
router.get('/:id', authMiddleware, serviceController.getOne);

// Создание новой услуги
router.post('/', authMiddleware, serviceController.create);

// Обновление услуги
router.put('/:id', authMiddleware, serviceController.update);

// Удаление услуги
router.delete('/:id', authMiddleware, serviceController.delete);

module.exports = router; 