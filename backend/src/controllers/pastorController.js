const { Pastor, Branch } = require('../models');

const getAll = async (req, res) => {
  try {
    const { branch_id } = req.query;
    const where = branch_id ? { branch_id } : {};

    const pastors = await Pastor.findAll({
      where,
      include: [{ model: Branch, as: 'branch' }],
    });

    res.json({ success: true, data: pastors });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const pastor = await Pastor.findByPk(req.params.pastorId, {
      include: [{ model: Branch, as: 'branch' }],
    });

    if (!pastor) {
      return res.status(404).json({ success: false, error: 'Pastor not found' });
    }

    res.json({ success: true, data: pastor });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { pastor_name, email, phone, branch_id } = req.validated;

    const pastor = await Pastor.create({
      pastor_name,
      email,
      phone,
      branch_id,
    });

    res.status(201).json({ success: true, data: pastor });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { pastorId } = req.params;
    const { pastor_name, email, phone } = req.validated;

    const pastor = await Pastor.findByPk(pastorId);
    if (!pastor) {
      return res.status(404).json({ success: false, error: 'Pastor not found' });
    }

    await pastor.update({ pastor_name, email, phone });

    res.json({ success: true, message: 'Pastor updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const delete_ = async (req, res) => {
  try {
    const { pastorId } = req.params;

    const pastor = await Pastor.findByPk(pastorId);
    if (!pastor) {
      return res.status(404).json({ success: false, error: 'Pastor not found' });
    }

    await pastor.destroy();

    res.json({ success: true, message: 'Pastor deleted successfully' });
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
