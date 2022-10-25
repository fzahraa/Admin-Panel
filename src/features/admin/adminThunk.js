import { customFetch } from '../../utils/axios';
import { checkStatus, checkError } from '../../utils/helpers';

export const fetchNonVerifiedUsersThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/admin/searchNonVerified");
    if (checkStatus(resp)) { return thunkAPI.rejectWithValue(resp.data.message); }
    return resp.data;
  } catch (error) {
    const message = checkError(error);
    return thunkAPI.rejectWithValue(message);
  }
};

export const fetchSubscriptionPendingUsersThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/admin/searchSubscriptionPendingUsers");
    if (checkStatus(resp)) { return thunkAPI.rejectWithValue(resp.data.message); }
    return resp.data;
  } catch (error) {
    const message = checkError(error);
    return thunkAPI.rejectWithValue(message);
  }
};

export const fetchVerifiedUsersThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/admin/searchVerified");
    if (checkStatus(resp)) { return thunkAPI.rejectWithValue(resp.data.message); }
    return resp.data;
  } catch (error) {
    const message = checkError(error);
    return thunkAPI.rejectWithValue(message);
  }
};



