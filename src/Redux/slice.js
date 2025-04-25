import { createSlice } from "@reduxjs/toolkit";

const AllSlice = createSlice({
  name: "AllSlice",
  initialState: {
    snackbar: {
      open: false,
      message: "",
      severity: "info", // Can be "success", "error", "warning", or "info"
    },
    userInfo: {
      user: null,
      isLoggedIn: false,
    },
    loading: {
      isLoading: false,
    },
  },
  reducers: {
    // Snackbar reducers
    showSnackbar: (state, action) => {
      console.log("Snackbar State Updated:", action.payload);
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity || "info";
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
      state.snackbar.message = "";
      state.snackbar.severity = "info";
    },

    // UserInfo reducers
    setUserInfo: (state, action) => {
      state.userInfo.user = action.payload;
      state.userInfo.isLoggedIn = true;
    },
    clearUserInfo: (state) => {
      state.userInfo.user = null;
      state.userInfo.isLoggedIn = false;
    },

    // Loading reducers
    startLoading: (state) => {
      state.loading.isLoading = true;
    },
    stopLoading: (state) => {
      state.loading.isLoading = false;
    },
  },
});

export const {
  showSnackbar,
  hideSnackbar,
  setUserInfo,
  clearUserInfo,
  startLoading,
  stopLoading,
} = AllSlice.actions;

export default AllSlice.reducer;