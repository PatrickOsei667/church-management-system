import API from './api';

const memberService = {
  getAll: async (branchId = null, limit = 10, page = 1) => {
    const params = { limit, page };
    if (branchId) params.branch_id = branchId;
    const response = await API.get('/members', { params });
    return response.data;
  },

  getById: async (memberId) => {
    const response = await API.get(`/members/${memberId}`);
    return response.data.data;
  },

  create: async (memberData) => {
    const response = await API.post('/members', memberData);
    return response.data.data;
  },

  update: async (memberId, memberData) => {
    const response = await API.put(`/members/${memberId}`, memberData);
    return response.data;
  },

  delete: async (memberId) => {
    const response = await API.delete(`/members/${memberId}`);
    return response.data;
  },
};

export default memberService;
