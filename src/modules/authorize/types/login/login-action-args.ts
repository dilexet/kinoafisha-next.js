export interface LoginActionArgs {
  data: {
    email: string,
    password: string,
  };
  rememberMe: boolean;
}