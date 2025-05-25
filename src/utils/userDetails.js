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
  },
});
export let { addUser } = userDetails.actions;
export default userDetails.reducer;
