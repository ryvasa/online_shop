import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // LOGIN
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // REGESTER
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // LOGUT
    logoutStart: (state) => {
      state.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null; // mengubah currentUser menjadi null saat berhasil logout
    },

    logoutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE USER
    updateUserStart: (state) => {
      state.isFetching = true;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },

    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // GET ALL USERS
    getAllUsersStart: (state) => {
      state.isFetching = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },

    getAllUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getAllUsersStart,
  getAllUsersSuccess,
  getAllUsersFailure,
} = userSlice.actions;
export default userSlice.reducer;
