import { createSlice } from "@reduxjs/toolkit";

// export default function userDetails() {
let userDetails = createSlice({
  name: "user",
  initialState: {
    email: "",
    profile_photo: "https://avatars.githubusercontent.com/u/101015037?v=4",
  },
  reducers: {
    addUser: (state, action) => {
      return {
        email: action.payload.email,
        profile_photo: action.payload.photo
          ? action.payload.photo
          : state.profile_photo,
      };
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});
export let { addUser, removeUser } = userDetails.actions;
export default userDetails.reducer;
