import API from './api';

const pastorService = {
  getAll: async (branchId = null) => {
    const params = {};
    if (branchId) params.branch_id = branchId;
    const response = await API.get('/pastors', { params });
    return response.data.data;
  },

  getById: async (pastorId) => {
    const response = await API.get(`/pastors/${pastorId}`);
    return response.data.data;
  },

  create: async (pastorData) => {
    const response = await API.post('/pastors', pastorData);
    return response.data.data;
  },

  update: async (pastorId, pastorData) => {
    const response = await API.put(`/pastors/${pastorId}`, pastorData);
    return response.data;
  },

  delete: async (pastorId) => {
    const response = await API.delete(`/pastors/${pastorId}`);
    return response.data;
  },
};

export default pastorService;
