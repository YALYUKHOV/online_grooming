const Router = require('express');
const router = Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateRegistration, validateLogin, validateChangePassword } = require('../middleware/validationMiddleware');

router.post('/registration', validateRegistration, clientController.registration);
router.post('/login', validateLogin, clientController.login);
router.get('/auth', authMiddleware, clientController.check);
router.get('/appointments/:id', authMiddleware, clientController.getClientAppointments);
router.post('/change-password', authMiddleware, validateChangePassword, clientController.changePassword);
router.post('/logout', authMiddleware, clientController.logout);
router.post('/reset-password', clientController.resetPassword);

module.exports = router;
