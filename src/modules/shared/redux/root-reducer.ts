import { combineReducers } from "@reduxjs/toolkit";
import authorize_reducer from "@/modules/authorize/reducer";
import cinema_management_reducer from "@/modules/dashboard/cinema-management/reducer";
import movie_management_reducer from "@/modules/dashboard/movie-management/reducer";
import upload_image_reducer from "@/modules/upload-image/reducer";
import genres_reducer from "@/modules/genres/reducer";
import countries_reducer from "@/modules/countries/reducer";

export const rootReducer = combineReducers({
  authorize_reducer,
  cinema_management_reducer,
  movie_management_reducer,
  upload_image_reducer,
  genres_reducer,
  countries_reducer,
});
