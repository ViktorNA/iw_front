import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "searchUsers",
  initialState: {
    users: [],
    request: "",
  },
  reducers: {
    setSearchUsers: (state, action) => {
      state.users = action.payload;
    },
    setRequest: (state, action) => {
      state.request = action.payload;
    },
  },
});

export const { setRequest, setSearchUsers } = counterSlice.actions;

export default counterSlice.reducer;
