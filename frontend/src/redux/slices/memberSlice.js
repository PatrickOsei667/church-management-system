import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: [],
  selectedMember: null,
  pagination: { total: 0, page: 1, limit: 10, pages: 0 },
  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    setSelectedMember: (state, action) => {
      state.selectedMember = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addMember: (state, action) => {
      state.members.push(action.payload);
    },
    updateMember: (state, action) => {
      const index = state.members.findIndex((m) => m.member_id === action.payload.member_id);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    removeMember: (state, action) => {
      state.members = state.members.filter((m) => m.member_id !== action.payload);
    },
  },
});

export const {
  setMembers,
  setSelectedMember,
  setLoading,
  setError,
  addMember,
  updateMember,
  removeMember,
} = memberSlice.actions;
export default memberSlice.reducer;
