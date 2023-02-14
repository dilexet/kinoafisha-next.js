export interface TokensType {
  accessToken: string;
  refreshToken: string;
}

export interface TokenResultType {
  accessToken: string;
  refreshToken: string;
  rememberMe: boolean;
}

export interface TokenPayload {
  userId: string;
  userProfileId: string;
  roleId: string;
  role: string;
  email: string;
  name: string;
  isActivated: boolean;
  exp: number;
  iat: number;
}