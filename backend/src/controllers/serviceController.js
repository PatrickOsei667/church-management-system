const { Service, Branch } = require('../models');
const { Op } = require('sequelize');

const getAll = async (req, res) => {
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
      include: [{ model: Branch, as: 'branch' }],
      order: [['service_date', 'DESC']],
    });

    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.serviceId, {
      include: [{ model: Branch, as: 'branch' }],
    });

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { service_type, service_date, branch_id } = req.validated;

    const service = await Service.create({
      service_type,
      service_date: new Date(service_date),
      branch_id,
    });

    res.status(201).json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { service_type, service_date } = req.validated;

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    await service.update({
      service_type,
      service_date: new Date(service_date),
    });

    res.json({ success: true, message: 'Service updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const delete_ = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    await service.destroy();

    res.json({ success: true, message: 'Service deleted successfully' });
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
