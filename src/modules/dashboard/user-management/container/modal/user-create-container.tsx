import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import {
  UserFieldCreateType,
  UserFieldCreateValues,
} from "@/modules/dashboard/user-management/constants/user-field-values";
import { userCreateValidationSchema } from "@/modules/dashboard/user-management/utils/user-validation-schema";
import { userCreateAsync } from "@/modules/dashboard/user-management/action";
import UserForm from "@/modules/dashboard/user-management/component/user-form";

export default function UserCreateContainer({ handleCloseModal, userCreateFields }) {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((x) => x.user_management_reducer);

  const [wasCreated, setWasCreated] = useState(false);
  const handleSubmit = async (values: UserFieldCreateType) => {
    if (await userCreateValidationSchema.isValid(values)) {
      await dispatch(userCreateAsync(values));
      setWasCreated(true);
    }
  };

  useEffect(() => {
    if (userState?.loadingStatusCreate === LOADING_STATUSES.IDLE && wasCreated) {
      handleCloseModal();
    }
  }, [userState?.loadingStatusCreate, handleCloseModal, wasCreated]);


  return (
    <UserForm
      title="Create user"
      validationSchema={userCreateValidationSchema}
      initialValues={UserFieldCreateValues}
      handleSubmit={handleSubmit}
      handleCancel={handleCloseModal}
      userState={userState}
      textFields={userCreateFields}
    />
  );
}