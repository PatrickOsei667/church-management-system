import React, { useState, useEffect } from 'react';
import donationService from '../services/donationService';
import memberService from '../services/memberService';
import branchService from '../services/branchService';

const DonationsPage = () => {
  const [donations, setDonations] = useState([]);
  const [members, setMembers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    member_id: '',
    branch_id: '',
    donation_date: '',
    items: [{ donation_type: '', amount: '' }],
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [donationData, memberData, branchData] = await Promise.all([
        donationService.getAll(),
        memberService.getAll(),
        branchService.getAll(),
      ]);
      setDonations(donationData);
      setMembers(memberData.data);
      setBranches(branchData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { donation_type: '', amount: '' }],
    });
  };

  const handleRemoveItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        donation_date: new Date(formData.donation_date).toISOString(),
        member_id: parseInt(formData.member_id),
        branch_id: parseInt(formData.branch_id),
        items: formData.items.map((item) => ({
          donation_type: item.donation_type,
          amount: parseFloat(item.amount),
        })),
      };

      if (editing) {
        await donationService.update(editing, submitData);
      } else {
        await donationService.create(submitData);
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error('Error saving donation:', err);
    }
  };

  const handleDelete = async (donationId) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      try {
        await donationService.delete(donationId);
        fetchData();
      } catch (err) {
        console.error('Error deleting donation:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      member_id: '',
      branch_id: '',
      donation_date: '',
      items: [{ donation_type: '', amount: '' }],
    });
    setShowForm(false);
    setEditing(null);
  };

  const getTotalAmount = () => {
    return formData.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Donations</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'Record Donation'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Member</label>
                <select
                  value={formData.member_id}
                  onChange={(e) => setFormData({ ...formData, member_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select Member</option>
                  {members.map((m) => (
                    <option key={m.member_id} value={m.member_id}>
                      {m.member_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Branch</label>
                <select
                  value={formData.branch_id}
                  onChange={(e) => setFormData({ ...formData, branch_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select Branch</option>
                  {branches.map((b) => (
                    <option key={b.branch_id} value={b.branch_id}>
                      {b.branch_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Date</label>
                <input
                  type="datetime-local"
                  value={formData.donation_date}
                  onChange={(e) => setFormData({ ...formData, donation_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-bold mb-2">Donation Items</h3>
              {formData.items.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Type (e.g., Tithe, Offering)"
                    value={item.donation_type}
                    onChange={(e) => handleItemChange(index, 'donation_type', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={item.amount}
                    onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded"
                    step="0.01"
                    required
                  />
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddItem}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded mt-2"
              >
                + Add Item
              </button>
            </div>

            <div className="bg-gray-100 p-3 rounded mb-4">
              <p className="font-bold">Total Amount: ${getTotalAmount().toFixed(2)}</p>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                {editing ? 'Update' : 'Record'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading donations...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Member</th>
                <th className="border border-gray-300 p-2">Branch</th>
                <th className="border border-gray-300 p-2">Items</th>
                <th className="border border-gray-300 p-2">Total</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.donation_id}>
                  <td className="border border-gray-300 p-2">{donation.donation_id}</td>
                  <td className="border border-gray-300 p-2">{new Date(donation.donation_date).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2">{donation.member?.member_name}</td>
                  <td className="border border-gray-300 p-2">{donation.branch?.branch_name}</td>
                  <td className="border border-gray-300 p-2">
                    {donation.items?.map((item) => `${item.donation_type}: $${item.amount}`).join(', ')}
                  </td>
                  <td className="border border-gray-300 p-2 font-bold">${donation.total_amount}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleDelete(donation.donation_id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {donations.length === 0 && <p className="mt-4 text-center text-gray-500">No donations found</p>}
        </div>
      )}
    </div>
  );
};

export default DonationsPage;
