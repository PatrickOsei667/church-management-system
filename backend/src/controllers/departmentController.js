const { Department, Branch } = require('../models');

const getAllDepartments = async (req, res) => {
  try {
    const { branch_id } = req.query;

    const where = {};
    if (branch_id) where.branch_id = branch_id;

    const departments = await Department.findAll({
      where,
      include: [{ model: Branch, attributes: ['branch_id', 'branch_name'] }],
    });

    res.json({
      success: true,
      data: departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const department = await Department.findByPk(departmentId, {
      include: [{ model: Branch, attributes: ['branch_id', 'branch_name', 'location'] }],
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        error: 'Department not found',
      });
    }

    res.json({
      success: true,
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { department_name, leader, branch_id } = req.body;

    if (!department_name || !branch_id) {
      return res.status(400).json({
        success: false,
        error: 'Department name and branch ID are required',
      });
    }

    const department = await Department.create({
      department_name,
      leader,
      branch_id,
    });

    res.status(201).json({
      success: true,
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { department_name, leader, branch_id } = req.body;

    const department = await Department.findByPk(departmentId);
    if (!department) {
      return res.status(404).json({
        success: false,
        error: 'Department not found',
      });
    }

    await department.update({
      department_name,
      leader,
      branch_id,
    });

    res.json({
      success: true,
      message: 'Department updated successfully',
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const department = await Department.findByPk(departmentId);
    if (!department) {
      return res.status(404).json({
        success: false,
        error: 'Department not found',
      });
    }

    await department.destroy();

    res.json({
      success: true,
      message: 'Department deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
