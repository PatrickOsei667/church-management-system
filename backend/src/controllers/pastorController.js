const { Pastor, Branch } = require('../models');

const getAllPastors = async (req, res) => {
  try {
    const { branch_id } = req.query;

    const where = {};
    if (branch_id) where.branch_id = branch_id;

    const pastors = await Pastor.findAll({
      where,
      include: [{ model: Branch, attributes: ['branch_id', 'branch_name'] }],
    });

    res.json({
      success: true,
      data: pastors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getPastorById = async (req, res) => {
  try {
    const { pastorId } = req.params;

    const pastor = await Pastor.findByPk(pastorId, {
      include: [{ model: Branch, attributes: ['branch_id', 'branch_name', 'location'] }],
    });

    if (!pastor) {
      return res.status(404).json({
        success: false,
        error: 'Pastor not found',
      });
    }

    res.json({
      success: true,
      data: pastor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const createPastor = async (req, res) => {
  try {
    const { pastor_name, email, phone, branch_id } = req.body;

    if (!pastor_name || !branch_id) {
      return res.status(400).json({
        success: false,
        error: 'Pastor name and branch ID are required',
      });
    }

    const pastor = await Pastor.create({
      pastor_name,
      email,
      phone,
      branch_id,
    });

    res.status(201).json({
      success: true,
      data: pastor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updatePastor = async (req, res) => {
  try {
    const { pastorId } = req.params;
    const { pastor_name, email, phone, branch_id } = req.body;

    const pastor = await Pastor.findByPk(pastorId);
    if (!pastor) {
      return res.status(404).json({
        success: false,
        error: 'Pastor not found',
      });
    }

    await pastor.update({
      pastor_name,
      email,
      phone,
      branch_id,
    });

    res.json({
      success: true,
      message: 'Pastor updated successfully',
      data: pastor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deletePastor = async (req, res) => {
  try {
    const { pastorId } = req.params;

    const pastor = await Pastor.findByPk(pastorId);
    if (!pastor) {
      return res.status(404).json({
        success: false,
        error: 'Pastor not found',
      });
    }

    await pastor.destroy();

    res.json({
      success: true,
      message: 'Pastor deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllPastors,
  getPastorById,
  createPastor,
  updatePastor,
  deletePastor,
};
