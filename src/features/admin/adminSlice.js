import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fetchNonVerifiedUsersThunk, fetchVerifiedUsersThunk, fetchSubscriptionPendingUsersThunk } from './adminThunk';

const initialState = {
  isLoading: false,
  isSuccess: false,
  nonVerifiedUsers: [],
  verifiedUsers: [],
  subscriptionPendingUsers: []
};

export const fetchNonVerifiedUsers = createAsyncThunk('admin/fetchNonVerifiedUsers', fetchNonVerifiedUsersThunk);
export const fetchVerifiedUsers = createAsyncThunk('admin/fetchVerifiedUsers', fetchVerifiedUsersThunk);
export const fetchSubscriptionPendingUsers = createAsyncThunk('admin/fetchSubscriptionPendingUsers', fetchSubscriptionPendingUsersThunk);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reset: (state) => {
      state.nonVerifiedUsers= [];
      state.verifiedUsers= []
    }
  },
  extraReducers: {
    [fetchNonVerifiedUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchNonVerifiedUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.nonVerifiedUsers = payload.data;
    },
    [fetchNonVerifiedUsers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.nonVerifiedUsers = [];
      toast.error(payload);
    },

    [fetchSubscriptionPendingUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSubscriptionPendingUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.subscriptionPendingUsers = payload.data;
    },
    [fetchSubscriptionPendingUsers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.subscriptionPendingUsers = [];
      toast.error(payload);
    },

    [fetchVerifiedUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchVerifiedUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.verifiedUsers = payload.data;
    },
    [fetchVerifiedUsers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.verifiedUsers = [];
      toast.error(payload);
    },

  }
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;


