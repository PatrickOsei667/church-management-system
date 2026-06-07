const { Department, Branch } = require('../models');

const getAll = async (req, res) => {
  try {
    const { branch_id } = req.query;
    const where = branch_id ? { branch_id } : {};

    const departments = await Department.findAll({
      where,
      include: [{ model: Branch, as: 'branch' }],
    });

    res.json({ success: true, data: departments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.departmentId, {
      include: [{ model: Branch, as: 'branch' }],
    });

    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }

    res.json({ success: true, data: department });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { department_name, leader, branch_id } = req.validated;

    const department = await Department.create({
      department_name,
      leader,
      branch_id,
    });

    res.status(201).json({ success: true, data: department });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { department_name, leader } = req.validated;

    const department = await Department.findByPk(departmentId);
    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }

    await department.update({ department_name, leader });

    res.json({ success: true, message: 'Department updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const delete_ = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const department = await Department.findByPk(departmentId);
    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }

    await department.destroy();

    res.json({ success: true, message: 'Department deleted successfully' });
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
