import API from './api';

const donationService = {
  getAll: async (filters = {}) => {
    const response = await API.get('/donations', { params: filters });
    return response.data.data;
  },

  getById: async (donationId) => {
    const response = await API.get(`/donations/${donationId}`);
    return response.data.data;
  },

  create: async (donationData) => {
    const response = await API.post('/donations', donationData);
    return response.data.data;
  },

  update: async (donationId, donationData) => {
    const response = await API.put(`/donations/${donationId}`, donationData);
    return response.data;
  },

  delete: async (donationId) => {
    const response = await API.delete(`/donations/${donationId}`);
    return response.data;
  },
};

export default donationService;
