export interface UserType {
  id: string;
  name: string;
  email: string;
  provider: string;
  isActivated: boolean;
  isBlocked: boolean;
  role: RoleType;
}

export interface RoleType {
  id: string;
  name: string;
}
