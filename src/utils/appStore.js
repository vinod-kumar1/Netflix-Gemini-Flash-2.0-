import { configureStore } from "@reduxjs/toolkit";
import userDetails from "./userDetails";
import moviesPagination from "./moviesPagination";

export default configureStore({
  reducer: {
    user: userDetails,
    moviesPagn: moviesPagination,
  },
});
