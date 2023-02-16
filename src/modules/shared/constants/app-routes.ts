export const authorize = {
  Default: "/authorize",
  Login: "/authorize",
  Register: "/authorize/register",
};

export const user_profile = "/profile";

export const dashboard = {
  Default: "/dashboard",
  Cinemas: "/dashboard/cinemas",
  Halls: "/dashboard/halls",
  Movies: "/dashboard/movies",
  Sessions: "/dashboard/sessions",
  Users: "/dashboard/users",
};

export const home = "/";
export const afisha = "/afisha";
export const movie_sessions = (id) => `${afisha}/${id}`;
export const session_booking = (id) => `/booking/${id}`;
