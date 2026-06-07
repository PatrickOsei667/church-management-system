const express = require('express');
const departmentController = require('../controllers/departmentController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { departmentSchema } = require('../validators/departmentValidator');

const router = express.Router();

router.get('/', departmentController.getAll);
router.get('/:departmentId', departmentController.getById);
router.post('/', authenticate, authorize('admin'), validate(departmentSchema), departmentController.create);
router.put('/:departmentId', authenticate, authorize('admin'), validate(departmentSchema), departmentController.update);
router.delete('/:departmentId', authenticate, authorize('admin'), departmentController.delete);

module.exports = router;
