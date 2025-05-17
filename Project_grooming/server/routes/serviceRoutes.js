const Router = require('express');
const router = Router();
const serviceController = require('../controllers/serviceController');


router.post('/', serviceController.create)
router.get('/', serviceController.getAll)
router.delete('/:id', serviceController.delete)
router.put('/:id', serviceController.update)

module.exports = router;
