const express = require('express');
const branchController = require('../controllers/branchController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { branchSchema } = require('../validators/branchValidator');

const router = express.Router();

router.get('/', branchController.getAll);
router.get('/:branchId', branchController.getById);
router.post('/', authenticate, authorize('admin'), validate(branchSchema), branchController.create);
router.put('/:branchId', authenticate, authorize('admin'), validate(branchSchema), branchController.update);
router.delete('/:branchId', authenticate, authorize('admin'), branchController.delete);

module.exports = router;
