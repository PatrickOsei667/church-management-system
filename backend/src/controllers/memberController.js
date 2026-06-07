const { Member, Branch, Donation } = require('../models');
const { Op } = require('sequelize');

const getAllMembers = async (req, res) => {
  try {
    const { branch_id, search, limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (branch_id) where.branch_id = branch_id;
    if (search) {
      where[Op.or] = [
        { member_name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Member.findAndCountAll({
      where,
      include: [{ model: Branch, attributes: ['branch_id', 'branch_name'] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getMemberById = async (req, res) => {
  try {
    const { memberId } = req.params;

    const member = await Member.findByPk(memberId, {
      include: [
        { model: Branch, attributes: ['branch_id', 'branch_name', 'location'] },
        {
          model: Donation,
          attributes: ['donation_id', 'donation_date', 'total_amount'],
        },
      ],
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found',
      });
    }

    res.json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { member_name, phone, address, branch_id } = req.body;

    const member = await Member.findByPk(memberId);
    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found',
      });
    }

    await member.update({
      member_name,
      phone,
      address,
      branch_id,
    });

    res.json({
      success: true,
      message: 'Member updated successfully',
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    const member = await Member.findByPk(memberId);
    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found',
      });
    }

    await member.destroy();

    res.json({
      success: true,
      message: 'Member deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
