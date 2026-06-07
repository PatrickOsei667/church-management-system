const express = require('express');
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validation');
const { loginSchema, registerSchema } = require('../validators/authValidator');

const router = express.Router();

router.post('/login', validate(loginSchema), authController.login);
router.post('/register', validate(registerSchema), authController.register);

module.exports = router;
