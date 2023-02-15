export interface UserProfileUpdateArgs {
  userProfileId: string;
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}
