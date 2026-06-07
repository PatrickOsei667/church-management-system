const express = require('express');
const serviceController = require('../controllers/serviceController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { serviceSchema } = require('../validators/serviceValidator');

const router = express.Router();

router.get('/', serviceController.getAll);
router.get('/:serviceId', serviceController.getById);
router.post('/', authenticate, authorize('admin', 'pastor'), validate(serviceSchema), serviceController.create);
router.put('/:serviceId', authenticate, authorize('admin', 'pastor'), validate(serviceSchema), serviceController.update);
router.delete('/:serviceId', authenticate, authorize('admin'), serviceController.delete);

module.exports = router;
