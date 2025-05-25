import { configureStore } from "@reduxjs/toolkit";
import userDetails from "./userDetails";

export default configureStore({
  reducer: {
    user: userDetails,
  },
});
