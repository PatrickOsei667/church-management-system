import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  donations: [],
  selectedDonation: null,
  loading: false,
  error: null,
};

const donationSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    setDonations: (state, action) => {
      state.donations = action.payload;
    },
    setSelectedDonation: (state, action) => {
      state.selectedDonation = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addDonation: (state, action) => {
      state.donations.push(action.payload);
    },
    updateDonation: (state, action) => {
      const index = state.donations.findIndex((d) => d.donation_id === action.payload.donation_id);
      if (index !== -1) {
        state.donations[index] = action.payload;
      }
    },
    removeDonation: (state, action) => {
      state.donations = state.donations.filter((d) => d.donation_id !== action.payload);
    },
  },
});

export const {
  setDonations,
  setSelectedDonation,
  setLoading,
  setError,
  addDonation,
  updateDonation,
  removeDonation,
} = donationSlice.actions;
export default donationSlice.reducer;
