import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import {
  UserFieldUpdateType,
} from "@/modules/dashboard/user-management/constants/user-field-values";
import {
  userUpdateValidationSchema,
} from "@/modules/dashboard/user-management/utils/user-validation-schema";
import { userUpdateAsync } from "@/modules/dashboard/user-management/action";
import UserForm from "@/modules/dashboard/user-management/component/user-form";

export default function UserUpdateContainer({ handleCloseModal, userUpdateFields }) {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((x) => x.user_management_reducer);

  const [initialValues, setInitialValues] = useState<UserFieldUpdateType>(null);
  const [wasUpdated, setWasUpdated] = useState(false);

  const handleSubmit = async (values: UserFieldUpdateType) => {
    if (await userUpdateValidationSchema.isValid(values)) {
      await dispatch(userUpdateAsync({ values: values, id: values.id }));
      setWasUpdated(true);
    }
  };

  useEffect(() => {
    if (userState?.loadingStatusUpdate === LOADING_STATUSES.IDLE && wasUpdated) {
      handleCloseModal();
    }
  }, [userState?.loadingStatusUpdate, handleCloseModal, wasUpdated]);

  useEffect(() => {
    if (!initialValues && userState?.loadingStatusGetOne === LOADING_STATUSES.IDLE) {
      setInitialValues({
        id: userState?.user?.id,
        name: userState?.user?.name,
        email: userState?.user?.email,
        roleId: userState?.user?.role?.id,
      });
    }
  }, [initialValues, userState?.loadingStatusGetOne, userState?.user?.email, userState?.user?.id, userState?.user?.name, userState?.user?.role?.id]);

  return (
    <UserForm
      title="Update user"
      validationSchema={userUpdateValidationSchema}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      handleCancel={handleCloseModal}
      userState={userState}
      textFields={userUpdateFields}
    />
  );
}