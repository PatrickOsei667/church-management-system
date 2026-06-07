import API from './api';

const branchService = {
  getAll: async () => {
    const response = await API.get('/branches');
    return response.data.data;
  },

  getById: async (branchId) => {
    const response = await API.get(`/branches/${branchId}`);
    return response.data.data;
  },

  create: async (branchData) => {
    const response = await API.post('/branches', branchData);
    return response.data.data;
  },

  update: async (branchId, branchData) => {
    const response = await API.put(`/branches/${branchId}`, branchData);
    return response.data;
  },

  delete: async (branchId) => {
    const response = await API.delete(`/branches/${branchId}`);
    return response.data;
  },
};

export default branchService;
