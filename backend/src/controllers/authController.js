const { Member } = require('../models');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const generateToken = (user) => {
  return jwt.sign(
    {
      member_id: user.member_id,
      email: user.email,
      role: user.role,
      branch_id: user.branch_id,
    },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: process.env.JWT_EXPIRY || '7d' }
  );
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    const member = await Member.findOne({ where: { email } });
    if (!member) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const isValidPassword = await member.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const token = generateToken(member);

    res.json({
      success: true,
      token,
      user: {
        member_id: member.member_id,
        member_name: member.member_name,
        email: member.email,
        role: member.role,
        branch_id: member.branch_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { member_name, email, password, phone, address, branch_id } = req.body;

    const existingMember = await Member.findOne({ where: { email } });
    if (existingMember) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered',
      });
    }

    const member = await Member.create({
      member_name,
      email,
      password_hash: password,
      phone,
      address,
      branch_id,
      role: 'member',
    });

    res.status(201).json({
      success: true,
      message: 'Member registered successfully',
      member_id: member.member_id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  login,
  register,
  generateToken,
};
