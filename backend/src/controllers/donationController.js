const { Donation, DonationItem, Member, Branch } = require('../models');
const { Op } = require('sequelize');

const getAllDonations = async (req, res) => {
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
        { model: Member, attributes: ['member_id', 'member_name', 'email'] },
        { model: Branch, attributes: ['branch_id', 'branch_name'] },
        { model: DonationItem, attributes: ['donation_item_id', 'donation_type', 'amount'] },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['donation_date', 'DESC']],
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getDonationById = async (req, res) => {
  try {
    const { donationId } = req.params;

    const donation = await Donation.findByPk(donationId, {
      include: [
        { model: Member, attributes: ['member_id', 'member_name', 'email'] },
        { model: Branch, attributes: ['branch_id', 'branch_name'] },
        { model: DonationItem },
      ],
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found',
      });
    }

    res.json({
      success: true,
      data: donation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const createDonation = async (req, res) => {
  try {
    const { member_id, branch_id, donation_date, items } = req.body;

    if (!member_id || !branch_id || !donation_date || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const total_amount = items.reduce((sum, item) => sum + parseFloat(item.amount), 0);

    const donation = await Donation.create({
      member_id,
      branch_id,
      donation_date,
      total_amount,
    });

    const donationItems = await Promise.all(
      items.map((item) =>
        DonationItem.create({
          donation_id: donation.donation_id,
          donation_type: item.donation_type,
          amount: item.amount,
        })
      )
    );

    res.status(201).json({
      success: true,
      data: {
        ...donation.toJSON(),
        items: donationItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { donation_date, items } = req.body;

    const donation = await Donation.findByPk(donationId);
    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found',
      });
    }

    if (items && items.length > 0) {
      await DonationItem.destroy({ where: { donation_id: donationId } });
      const total_amount = items.reduce((sum, item) => sum + parseFloat(item.amount), 0);
      await donation.update({ donation_date, total_amount });

      await Promise.all(
        items.map((item) =>
          DonationItem.create({
            donation_id: donationId,
            donation_type: item.donation_type,
            amount: item.amount,
          })
        )
      );
    } else {
      await donation.update({ donation_date });
    }

    res.json({
      success: true,
      message: 'Donation updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteDonation = async (req, res) => {
  try {
    const { donationId } = req.params;

    const donation = await Donation.findByPk(donationId);
    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found',
      });
    }

    await donation.destroy();

    res.json({
      success: true,
      message: 'Donation deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
};
