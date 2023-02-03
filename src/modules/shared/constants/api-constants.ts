export const API_URL = "http://localhost:3001";

const AUTHORIZE = "/authorize";

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