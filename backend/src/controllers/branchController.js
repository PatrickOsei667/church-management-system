const { Branch } = require('../models');

const getAll = async (req, res) => {
  try {
    const branches = await Branch.findAll();
    res.json({ success: true, data: branches });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.branchId, {
      include: [{ association: 'members' }, { association: 'pastors' }],
    });

    if (!branch) {
      return res.status(404).json({ success: false, error: 'Branch not found' });
    }

    res.json({ success: true, data: branch });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { branch_name, location } = req.validated;

    const branch = await Branch.create({ branch_name, location });

    res.status(201).json({
      success: true,
      data: branch,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { branchId } = req.params;
    const { branch_name, location } = req.validated;

    const branch = await Branch.findByPk(branchId);
    if (!branch) {
      return res.status(404).json({ success: false, error: 'Branch not found' });
    }

    await branch.update({ branch_name, location });

    res.json({
      success: true,
      message: 'Branch updated successfully',
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const delete_ = async (req, res) => {
  try {
    const { branchId } = req.params;

    const branch = await Branch.findByPk(branchId);
    if (!branch) {
      return res.status(404).json({ success: false, error: 'Branch not found' });
    }

    await branch.destroy();

    res.json({
      success: true,
      message: 'Branch deleted successfully',
    });
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
