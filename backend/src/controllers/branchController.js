const { Branch, Member, Pastor, Service, Donation, Department } = require('../models');
const { Op } = require('sequelize');

const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll({
      include: [
        { model: Member, attributes: ['member_id'] },
        { model: Pastor, attributes: ['pastor_id'] },
        { model: Service, attributes: ['service_id'] },
        { model: Donation, attributes: ['donation_id'] },
        { model: Department, attributes: ['department_id'] },
      ],
    });

    res.json({
      success: true,
      data: branches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getBranchById = async (req, res) => {
  try {
    const { branchId } = req.params;

    const branch = await Branch.findByPk(branchId, {
      include: [
        { model: Member, attributes: ['member_id', 'member_name', 'email'] },
        { model: Pastor, attributes: ['pastor_id', 'pastor_name', 'email'] },
        { model: Service, attributes: ['service_id', 'service_type', 'service_date'] },
        { model: Donation, attributes: ['donation_id', 'total_amount'] },
        { model: Department, attributes: ['department_id', 'department_name'] },
      ],
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found',
      });
    }

    res.json({
      success: true,
      data: branch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const createBranch = async (req, res) => {
  try {
    const { branch_name, location } = req.body;

    if (!branch_name || !location) {
      return res.status(400).json({
        success: false,
        error: 'Branch name and location are required',
      });
    }

    const branch = await Branch.create({
      branch_name,
      location,
    });

    res.status(201).json({
      success: true,
      data: branch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateBranch = async (req, res) => {
  try {
    const { branchId } = req.params;
    const { branch_name, location } = req.body;

    const branch = await Branch.findByPk(branchId);
    if (!branch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found',
      });
    }

    await branch.update({ branch_name, location });

    res.json({
      success: true,
      message: 'Branch updated successfully',
      data: branch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const { branchId } = req.params;

    const branch = await Branch.findByPk(branchId);
    if (!branch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found',
      });
    }

    await branch.destroy();

    res.json({
      success: true,
      message: 'Branch deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
};
