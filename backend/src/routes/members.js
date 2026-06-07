const express = require('express');
const memberController = require('../controllers/memberController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { memberSchema, updateMemberSchema } = require('../validators/memberValidator');

const router = express.Router();

router.get('/', memberController.getAll);
router.get('/:memberId', memberController.getById);
router.post('/', authenticate, authorize('admin', 'pastor'), validate(memberSchema), memberController.create);
router.put('/:memberId', authenticate, validate(updateMemberSchema), memberController.update);
router.delete('/:memberId', authenticate, authorize('admin'), memberController.delete);

module.exports = router;
