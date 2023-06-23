import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./bordersSlice";
const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
  },
});

export default store;
