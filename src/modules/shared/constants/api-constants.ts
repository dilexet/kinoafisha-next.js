export const API_URL = "http://localhost:3001";

export const AUTHORIZE = "/authorize";

export const LOGIN_ENDPOINT = AUTHORIZE + "/login";

export const REGISTER_ENDPOINT = AUTHORIZE + "/register";

export const LOGOUT_ENDPOINT = AUTHORIZE + "/logout";

export const REFRESH_ENDPOINT = AUTHORIZE + "/refresh";

export const GOOGLE_AUTHORIZE_ENDPOINT = AUTHORIZE + "/google";

export const CINEMA_MANAGEMENT = "/cinema-management";
export const MOVIE_MANAGEMENT = "/movie-management";
export const GENRES = "/genres";
export const COUNTRIES = "/countries";
export const IMAGE_UPLOAD = "/image-upload";
export const IMAGE_URL = (imageName) => API_URL + `/images/${imageName}`;

export const USER_MANAGEMENT = "/user-management";
export const ROLES = "/roles";

export const HALL_MANAGEMENT = "/hall-management";
export const CINEMAS = "/cinemas";
export const SEAT_TYPES = "/seat-types";

export const SESSION_MANAGEMENT = "/session-management";
export const HALLS = "/halls";
export const MOVIES = "/movies";
export const MOVIE_FILTER = "/movie-filter";
export const MOVIE_AFISHA = "/movie-filter/afisha";
export const BOOKING = "/booking";

export const BOOKING_GATEWAY = API_URL + "/booking-gateway";
export const COMMENTS_GATEWAY = API_URL + "/comments-gateway";

export const USER_PROFILE = "/user-profile";
