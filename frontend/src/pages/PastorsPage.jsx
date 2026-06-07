import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pastorService from '../services/pastorService';
import branchService from '../services/branchService';

const PastorsPage = () => {
  const [pastors, setPastors] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ pastor_name: '', email: '', phone: '', branch_id: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pastorData, branchData] = await Promise.all([
        pastorService.getAll(),
        branchService.getAll(),
      ]);
      setPastors(pastorData);
      setBranches(branchData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await pastorService.update(editing, formData);
      } else {
        await pastorService.create(formData);
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error('Error saving pastor:', err);
    }
  };

  const handleEdit = (pastor) => {
    setFormData({
      pastor_name: pastor.pastor_name,
      email: pastor.email,
      phone: pastor.phone,
      branch_id: pastor.branch_id,
    });
    setEditing(pastor.pastor_id);
    setShowForm(true);
  };

  const handleDelete = async (pastorId) => {
    if (window.confirm('Are you sure you want to delete this pastor?')) {
      try {
        await pastorService.delete(pastorId);
        fetchData();
      } catch (err) {
        console.error('Error deleting pastor:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({ pastor_name: '', email: '', phone: '', branch_id: '' });
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pastors</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'Add Pastor'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.pastor_name}
                  onChange={(e) => setFormData({ ...formData, pastor_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
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
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                {editing ? 'Update' : 'Create'}
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
        <p>Loading pastors...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-3">ID</th>
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">Email</th>
                <th className="border border-gray-300 p-3">Phone</th>
                <th className="border border-gray-300 p-3">Branch</th>
                <th className="border border-gray-300 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pastors.map((pastor) => (
                <tr key={pastor.pastor_id}>
                  <td className="border border-gray-300 p-3">{pastor.pastor_id}</td>
                  <td className="border border-gray-300 p-3">{pastor.pastor_name}</td>
                  <td className="border border-gray-300 p-3">{pastor.email}</td>
                  <td className="border border-gray-300 p-3">{pastor.phone}</td>
                  <td className="border border-gray-300 p-3">{pastor.branch?.branch_name}</td>
                  <td className="border border-gray-300 p-3">
                    <button
                      onClick={() => handleEdit(pastor)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pastor.pastor_id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pastors.length === 0 && <p className="mt-4 text-center text-gray-500">No pastors found</p>}
        </div>
      )}
    </div>
  );
};

export default PastorsPage;
