export interface RegisterActionArgs {
  data: {
    name: string;
    email: string;
    password: string;
  };
  rememberMe: boolean;
}
