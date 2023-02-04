import { combineReducers } from "@reduxjs/toolkit";
import { reducer as toastrReducer } from "react-redux-toastr";
import authorize_reducer from "@/modules/authorize/reducer";
import cinema_management_reducer from "@/modules/dashboard/cinema-management/reducer";
import movie_management_reducer from "@/modules/dashboard/movie-management/reducer";
import user_management_reducer from "@/modules/dashboard/user-management/reducer";
import upload_image_reducer from "@/modules/upload-image/reducer";
import genres_reducer from "@/modules/genres/reducer";
import countries_reducer from "@/modules/countries/reducer";
import roles_reducer from "@/modules/roles/reducer";

export const rootReducer = combineReducers({
  toastr: toastrReducer,
  authorize_reducer,
  cinema_management_reducer,
  movie_management_reducer,
  upload_image_reducer,
  genres_reducer,
  countries_reducer,
  user_management_reducer,
  roles_reducer,
});
