import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  branches: [],
  selectedBranch: null,
  loading: false,
  error: null,
};

const branchSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    setBranches: (state, action) => {
      state.branches = action.payload;
    },
    setSelectedBranch: (state, action) => {
      state.selectedBranch = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addBranch: (state, action) => {
      state.branches.push(action.payload);
    },
    updateBranch: (state, action) => {
      const index = state.branches.findIndex((b) => b.branch_id === action.payload.branch_id);
      if (index !== -1) {
        state.branches[index] = action.payload;
      }
    },
    removeBranch: (state, action) => {
      state.branches = state.branches.filter((b) => b.branch_id !== action.payload);
    },
  },
});

export const {
  setBranches,
  setSelectedBranch,
  setLoading,
  setError,
  addBranch,
  updateBranch,
  removeBranch,
} = branchSlice.actions;
export default branchSlice.reducer;
