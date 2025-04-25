import { configureStore } from "@reduxjs/toolkit";
import AllSlice from "./slice";

const store = configureStore({
  reducer: {
    combined: AllSlice,
  },
});

export default store;