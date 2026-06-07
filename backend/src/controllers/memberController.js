const { Member, Branch } = require('../models');

const getAll = async (req, res) => {
  try {
    const { branch_id, limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    const where = branch_id ? { branch_id } : {};

    const { count, rows } = await Member.findAndCountAll({
      where,
      include: [{ model: Branch, as: 'branch' }],
      limit: parseInt(limit),
      offset,
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
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.memberId, {
      include: [{ model: Branch, as: 'branch' }],
    });

    if (!member) {
      return res.status(404).json({ success: false, error: 'Member not found' });
    }

    res.json({ success: true, data: member });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { member_name, email, phone, address, branch_id } = req.validated;

    const member = await Member.create({
      member_name,
      email,
      phone,
      address,
      branch_id,
      role: 'member',
    });

    res.status(201).json({ success: true, data: member });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { member_name, phone, address } = req.validated;

    const member = await Member.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ success: false, error: 'Member not found' });
    }

    await member.update({ member_name, phone, address });

    res.json({ success: true, message: 'Member updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const delete_ = async (req, res) => {
  try {
    const { memberId } = req.params;

    const member = await Member.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ success: false, error: 'Member not found' });
    }

    await member.destroy();

    res.json({ success: true, message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: delete_,
};
