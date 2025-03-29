const Router = require('express');
const router = Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', clientController.registration);
router.post('/login', clientController.login);
router.get('/auth', authMiddleware,  clientController.check);

module.exports = router;
