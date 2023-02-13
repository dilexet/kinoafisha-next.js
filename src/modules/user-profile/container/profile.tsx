import ProfileComponent from "@/modules/user-profile/component/profile";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { getTokenPayload } from "@/modules/authorize/utils/token-service";
import { useRouter } from "next/navigation";
import { authorize } from "@/modules/shared/constants/app-routes";
import { userProfileUpdateActionAsync } from "@/modules/user-profile/action";
import { UserProfileUpdateArgs } from "@/modules/user-profile/types/user-profile-update-args";
import profileValidationSchema from "@/modules/user-profile/utils/profile-validation-schema";
import { useEffect, useState } from "react";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import Loading from "@/modules/loading";

export default function ProfileContainer() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profileState = useAppSelector(state => state.user_profile_reducer);
  const [initialValues, setInitialValues] = useState<UserProfileUpdateArgs>(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleSubmit = async (values: UserProfileUpdateArgs) => {
    if (await profileValidationSchema.isValid(values)) {
      const { userProfileId } = getTokenPayload();
      if (userProfileId) {
        values.userProfileId = userProfileId;
        await dispatch(await userProfileUpdateActionAsync(values));
        setIsUpdated(true);
      } else {
        router.push(authorize.Login);
      }
    }
  };

  useEffect(() => {
    if (initialValues === null && profileState?.loadingStatusGet === LOADING_STATUSES.IDLE) {
      setInitialValues({
        userProfileId: "",
        name: profileState.profile.name,
        email: profileState.profile.email,
        oldPassword: "",
        newPassword: "",
      });
    } else if (isUpdated === true && profileState?.loadingStatusUpdate === LOADING_STATUSES.IDLE) {
      setInitialValues({
        userProfileId: "",
        name: profileState.profile.name,
        email: profileState.profile.email,
        oldPassword: "",
        newPassword: "",
      });
      setIsUpdated(false);
    }
    if (profileState?.loadingStatusUpdate === LOADING_STATUSES.FAILED) {
      setIsUpdated(false);
    }
  }, [initialValues, isUpdated, profileState?.loadingStatusGet, profileState?.loadingStatusUpdate, profileState.profile.email, profileState.profile.name]);

  if (initialValues === null) {
    return <Loading />;
  }
  return (
    <ProfileComponent handleSubmit={handleSubmit} profileState={profileState} initialValues={initialValues} />
  );
}