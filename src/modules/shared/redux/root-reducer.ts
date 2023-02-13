import { combineReducers } from "@reduxjs/toolkit";
import { reducer as toastrReducer } from "react-redux-toastr";
import authorize_reducer from "@/modules/authorize/reducer";
import cinema_management_reducer from "@/modules/dashboard/cinema-management/reducer";
import movie_management_reducer from "@/modules/dashboard/movie-management/reducer";
import user_management_reducer from "@/modules/dashboard/user-management/reducer";
import hall_management_reducer from "@/modules/dashboard/hall-management/reducer";
import session_management_reducer from "@/modules/dashboard/session-management/reducer";
import upload_image_reducer from "@/modules/upload-image/reducer";
import genres_reducer from "@/modules/genres/reducer";
import countries_reducer from "@/modules/countries/reducer";
import roles_reducer from "@/modules/roles/reducer";
import cinemas_reducer from "@/modules/cinemas/reducer";
import seat_types_reducer from "@/modules/seat-types/reducer";
import halls_reducer from "@/modules/halls/reducer";
import movies_reducer from "@/modules/movies/reducer";
import movie_filter_reducer from "@/modules/home/reducer";
import movie_afisha_reducer from "@/modules/afisha/reducer";
import movie_sessions_reducer from "@/modules/movie-sessions/reducer";
import booking_reducer from "@/modules/booking/reducer";
import confirm_booking_reducer from "@/modules/confirm-booking/reducer";
import user_profile_reducer from "@/modules/user-profile/reducer";

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
  hall_management_reducer,
  cinemas_reducer,
  seat_types_reducer,
  session_management_reducer,
  halls_reducer,
  movies_reducer,
  movie_filter_reducer,
  movie_afisha_reducer,
  movie_sessions_reducer,
  booking_reducer,
  confirm_booking_reducer,
  user_profile_reducer,
});
