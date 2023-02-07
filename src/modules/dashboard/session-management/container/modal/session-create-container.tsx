import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { sessionCreateValidationSchema } from "@/modules/dashboard/session-management/utils/session-validation-schema";
import { SessionCreateFieldsType } from "@/modules/dashboard/session-management/types/session-field-types";
import { sessionCreateAsync } from "@/modules/dashboard/session-management/action";
import SessionForm from "@/modules/dashboard/session-management/component/session-form";
import { SessionFieldValues } from "@/modules/dashboard/session-management/constants/session-field-values";

export default function SessionCreateContainer({
  handleCloseModal,
  modalType,
}) {
  const dispatch = useAppDispatch();
  const sessionState = useAppSelector((x) => x.session_management_reducer);

  const [wasCreated, setWasCreated] = useState(false);
  const handleSubmit = async (values: SessionCreateFieldsType) => {
    if (await sessionCreateValidationSchema.isValid(values)) {
      await dispatch(sessionCreateAsync(values));
      setWasCreated(true);
    }
  };

  useEffect(() => {
    if (
      sessionState?.loadingStatusCreate === LOADING_STATUSES.IDLE &&
      wasCreated
    ) {
      handleCloseModal();
    }
  }, [sessionState?.loadingStatusCreate, handleCloseModal, wasCreated]);

  const initialValues = { ...SessionFieldValues, sessionTimes: [] };

  return (
    <SessionForm
      title='Create sessions'
      modalType={modalType}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      handleCancel={handleCloseModal}
      sessionState={sessionState}
      validationSchema={sessionCreateValidationSchema}
    />
  );
}
