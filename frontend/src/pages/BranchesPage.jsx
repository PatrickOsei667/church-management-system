import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import branchService from '../services/branchService';

const BranchesPage = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ branch_name: '', location: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const data = await branchService.getAll();
      setBranches(data);
    } catch (err) {
      console.error('Error fetching branches:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await branchService.update(editing, formData);
      } else {
        await branchService.create(formData);
      }
      setFormData({ branch_name: '', location: '' });
      setShowForm(false);
      setEditing(null);
      fetchBranches();
    } catch (err) {
      console.error('Error saving branch:', err);
    }
  };

  const handleEdit = (branch) => {
    setFormData({
      branch_name: branch.branch_name,
      location: branch.location,
    });
    setEditing(branch.branch_id);
    setShowForm(true);
  };

  const handleDelete = async (branchId) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        await branchService.delete(branchId);
        fetchBranches();
      } catch (err) {
        console.error('Error deleting branch:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({ branch_name: '', location: '' });
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Branches</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'Add Branch'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Branch Name</label>
              <input
                type="text"
                value={formData.branch_name}
                onChange={(e) => setFormData({ ...formData, branch_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                required
              />
            </div>
            <div className="flex gap-2">
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
        <p>Loading branches...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-3 text-left">ID</th>
                <th className="border border-gray-300 p-3 text-left">Name</th>
                <th className="border border-gray-300 p-3 text-left">Location</th>
                <th className="border border-gray-300 p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch.branch_id}>
                  <td className="border border-gray-300 p-3">{branch.branch_id}</td>
                  <td className="border border-gray-300 p-3">{branch.branch_name}</td>
                  <td className="border border-gray-300 p-3">{branch.location}</td>
                  <td className="border border-gray-300 p-3 text-center">
                    <button
                      onClick={() => handleEdit(branch)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(branch.branch_id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {branches.length === 0 && <p className="mt-4 text-center text-gray-500">No branches found</p>}
        </div>
      )}
    </div>
  );
};

export default BranchesPage;
