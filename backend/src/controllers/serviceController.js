const { Service, Branch } = require('../models');
const { Op } = require('sequelize');

const getAllServices = async (req, res) => {
  try {
    const { branch_id, start_date, end_date } = req.query;

    const where = {};
    if (branch_id) where.branch_id = branch_id;
    if (start_date || end_date) {
      where.service_date = {};
      if (start_date) where.service_date[Op.gte] = new Date(start_date);
      if (end_date) where.service_date[Op.lte] = new Date(end_date);
    }

    const services = await Service.findAll({
      where,
      include: [{ model: Branch, attributes: ['branch_id', 'branch_name'] }],
      order: [['service_date', 'DESC']],
    });

    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findByPk(serviceId, {
      include: [{ model: Branch, attributes: ['branch_id', 'branch_name', 'location'] }],
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const createService = async (req, res) => {
  try {
    const { service_type, service_date, branch_id } = req.body;

    if (!service_type || !service_date || !branch_id) {
      return res.status(400).json({
        success: false,
        error: 'Service type, date, and branch ID are required',
      });
    }

    const service = await Service.create({
      service_type,
      service_date,
      branch_id,
    });

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { service_type, service_date, branch_id } = req.body;

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    await service.update({
      service_type,
      service_date,
      branch_id,
    });

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    await service.destroy();

    res.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
