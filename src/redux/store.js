import { configureStore } from "@reduxjs/toolkit";
import searchUsersReducer from "./searchUsersSlice";

export default configureStore({
  reducer: {
    searchUsers: searchUsersReducer,
  },
});
