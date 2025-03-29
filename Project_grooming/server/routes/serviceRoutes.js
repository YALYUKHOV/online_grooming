const Router = require('express');
const router = Router();
const serviceController = require('../controllers/serviceController');


router.post('/', serviceController.create)
router.get('/', serviceController.getAll)
router.delete('/:id', serviceController.deleteOne)
router.put('/:id', serviceController.updateOne)

module.exports = router;
