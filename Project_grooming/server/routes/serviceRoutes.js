const express = require('express');
const serviceController = require('../controllers/serviceController');
const router = express.Router();

router.get('/', serviceController.getAllServices);
router.post('/', serviceController.createService);
router.get('/:id', serviceController.getServiceById);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
