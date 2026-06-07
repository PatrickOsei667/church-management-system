import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import branchReducer from './slices/branchSlice';
import memberReducer from './slices/memberSlice';
import donationReducer from './slices/donationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    branches: branchReducer,
    members: memberReducer,
    donations: donationReducer,
  },
});

export default store;
