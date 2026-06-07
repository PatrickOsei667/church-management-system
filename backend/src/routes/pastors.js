const express = require('express');
const pastorController = require('../controllers/pastorController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { pastorSchema } = require('../validators/pastorValidator');

const router = express.Router();

router.get('/', pastorController.getAll);
router.get('/:pastorId', pastorController.getById);
router.post('/', authenticate, authorize('admin'), validate(pastorSchema), pastorController.create);
router.put('/:pastorId', authenticate, authorize('admin'), validate(pastorSchema), pastorController.update);
router.delete('/:pastorId', authenticate, authorize('admin'), pastorController.delete);

module.exports = router;
