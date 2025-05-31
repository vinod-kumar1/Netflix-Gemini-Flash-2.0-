import { createSlice } from "@reduxjs/toolkit";
import { tmdbKeys } from "../tmdb";

// export default function userDetails() {
let userDetails = createSlice({
  name: "user",
  initialState: {
    email: "",
    profile_photo: tmdbKeys.profile_photo,
  },
  reducers: {
    addUser: (state, action) => {
      state.email = action.payload.email;
      state.profile_photo = action.payload.profile_photo;
    },
    removeUser: (state, action) => {
      return {
        email: "",
        profile_photo: tmdbKeys.profile_photo,
      };
    },
  },
});
export let { addUser, removeUser } = userDetails.actions;
export default userDetails.reducer;
