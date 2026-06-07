const express = require('express');
const donationController = require('../controllers/donationController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { donationSchema } = require('../validators/donationValidator');

const router = express.Router();

router.get('/', donationController.getAll);
router.get('/:donationId', donationController.getById);
router.post('/', authenticate, authorize('admin', 'pastor', 'member'), validate(donationSchema), donationController.create);
router.put('/:donationId', authenticate, authorize('admin', 'pastor'), validate(donationSchema), donationController.update);
router.delete('/:donationId', authenticate, authorize('admin'), donationController.delete);

module.exports = router;
