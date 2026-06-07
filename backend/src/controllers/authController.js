const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Member } = require('../models');

const login = async (req, res) => {
  try {
    const { email, password } = req.validated;

    const member = await Member.findOne({ where: { email } });
    if (!member) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, member.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      { member_id: member.member_id, email: member.email, role: member.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

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
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const register = async (req, res) => {
  try {
    const { member_name, email, password, phone, address, branch_id } = req.validated;

    const existingMember = await Member.findOne({ where: { email } });
    if (existingMember) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const member = await Member.create({
      member_name,
      email,
      password_hash: hashedPassword,
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
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { login, register };
