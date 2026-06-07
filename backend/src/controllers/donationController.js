const { Donation, DonationItem, Member, sequelize } = require('../models');
const { Op } = require('sequelize');

const getAll = async (req, res) => {
  try {
    const { member_id, branch_id, start_date, end_date, limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;
    const where = {};

    if (member_id) where.member_id = member_id;
    if (branch_id) where.branch_id = branch_id;
    if (start_date || end_date) {
      where.donation_date = {};
      if (start_date) where.donation_date[Op.gte] = new Date(start_date);
      if (end_date) where.donation_date[Op.lte] = new Date(end_date);
    }

    const { count, rows } = await Donation.findAndCountAll({
      where,
      include: [
        { 
          model: Member, 
          as: 'member',
          attributes: ['member_id', 'member_name', 'email'] // Select only needed columns
        },
        { 
          model: DonationItem, 
          as: 'items',
          attributes: ['donation_item_id', 'donation_type', 'amount'] // Select only needed columns
        },
      ],
      attributes: ['donation_id', 'member_id', 'branch_id', 'donation_date', 'total_amount'], // Select only needed columns
      order: [['donation_date', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      subQuery: false, // Prevent incorrect pagination with includes
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
    const donation = await Donation.findByPk(req.params.donationId, {
      include: [
        { 
          model: Member, 
          as: 'member',
          attributes: ['member_id', 'member_name', 'email']
        },
        { 
          model: DonationItem, 
          as: 'items',
          attributes: ['donation_item_id', 'donation_type', 'amount']
        },
      ],
      attributes: ['donation_id', 'member_id', 'branch_id', 'donation_date', 'total_amount'],
    });

    if (!donation) {
      return res.status(404).json({ success: false, error: 'Donation not found' });
    }

    res.json({ success: true, data: donation });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const create = async (req, res) => {
  // Use transaction to ensure data consistency
  const transaction = await sequelize.transaction();
  try {
    const { member_id, branch_id, donation_date, items } = req.validated;

    const totalAmount = items.reduce((sum, item) => sum + parseFloat(item.amount), 0);

    const donation = await Donation.create({
      member_id,
      branch_id,
      donation_date: new Date(donation_date),
      total_amount: totalAmount,
    }, { transaction });

    if (items && items.length > 0) {
      await DonationItem.bulkCreate(
        items.map((item) => ({
          donation_id: donation.donation_id,
          donation_type: item.donation_type,
          amount: item.amount,
        })),
        { transaction }
      );
    }

    await transaction.commit();

    res.status(201).json({
      success: true,
      data: { donation_id: donation.donation_id, total_amount: donation.total_amount },
    });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ success: false, error: err.message });
  }
};

const update = async (req, res) => {
  // Use transaction to ensure data consistency
  const transaction = await sequelize.transaction();
  try {
    const { donationId } = req.params;
    const { donation_date, items } = req.validated;

    const donation = await Donation.findByPk(donationId, { transaction });
    if (!donation) {
      await transaction.rollback();
      return res.status(404).json({ success: false, error: 'Donation not found' });
    }

    const totalAmount = items.reduce((sum, item) => sum + parseFloat(item.amount), 0);

    await donation.update({
      donation_date: new Date(donation_date),
      total_amount: totalAmount,
    }, { transaction });

    // Delete existing items and create new ones within the same transaction
    await DonationItem.destroy({ where: { donation_id: donationId }, transaction });
    
    if (items && items.length > 0) {
      await DonationItem.bulkCreate(
        items.map((item) => ({
          donation_id: donationId,
          donation_type: item.donation_type,
          amount: item.amount,
        })),
        { transaction }
      );
    }

    await transaction.commit();

    res.json({ success: true, message: 'Donation updated successfully' });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ success: false, error: err.message });
  }
};

const delete_ = async (req, res) => {
  try {
    const { donationId } = req.params;

    const donation = await Donation.findByPk(donationId);
    if (!donation) {
      return res.status(404).json({ success: false, error: 'Donation not found' });
    }

    await donation.destroy();

    res.json({ success: true, message: 'Donation deleted successfully' });
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
