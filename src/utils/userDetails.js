import { createSlice } from "@reduxjs/toolkit";

// export default function userDetails() {
let userDetails = createSlice({
  name: "user",
  initialState: {
    accessToken: null,
  },
  reducers: {
    addUser: (state, action) => {
      return { accessToken: action.payload.token };
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});
export let { addUser, removeUser } = userDetails.actions;
export default userDetails.reducer;
