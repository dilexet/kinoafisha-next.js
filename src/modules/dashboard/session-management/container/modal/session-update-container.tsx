import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { SessionUpdateFieldsType } from "@/modules/dashboard/session-management/types/session-field-types";
import { sessionUpdateValidationSchema } from "@/modules/dashboard/session-management/utils/session-validation-schema";
import { sessionUpdateAsync } from "@/modules/dashboard/session-management/action";
import SessionForm from "@/modules/dashboard/session-management/component/session-form";

export default function SessionUpdateContainer({
  handleCloseModal,
  modalType,
}) {
  const dispatch = useAppDispatch();
  const sessionState = useAppSelector((x) => x.session_management_reducer);

  const [initialValues, setInitialValues] =
    useState<SessionUpdateFieldsType>(null);
  const [wasUpdated, setWasUpdated] = useState(false);

  const handleSubmit = async (values: SessionUpdateFieldsType) => {
    console.log(values);
    if (await sessionUpdateValidationSchema.isValid(values)) {
      await dispatch(sessionUpdateAsync({ values: values, id: values.id }));
      setWasUpdated(true);
    }
  };

  useEffect(() => {
    if (
      sessionState?.loadingStatusUpdate === LOADING_STATUSES.IDLE &&
      wasUpdated
    ) {
      handleCloseModal();
    }
  }, [sessionState?.loadingStatusUpdate, handleCloseModal, wasUpdated]);

  useEffect(() => {
    if (
      !initialValues &&
      sessionState?.loadingStatusGetOne === LOADING_STATUSES.IDLE
    ) {
      setInitialValues({
        id: sessionState?.session?.sessionData.id,
        movieId: sessionState?.session?.sessionData.movieId,
        cinemaId: sessionState?.session?.sessionData.cinemaId,
        hallId: sessionState?.session?.sessionData.hallId,
        sessionTime: {
          startDate: sessionState?.session?.sessionData?.startDate,
          coefficient: sessionState?.session?.sessionData?.coefficient,
        },
      });
    }
  }, [
    initialValues,
    sessionState?.loadingStatusGetOne,
    sessionState?.session?.sessionData.cinemaId,
    sessionState?.session?.sessionData?.coefficient,
    sessionState?.session?.sessionData.hallId,
    sessionState?.session?.sessionData.id,
    sessionState?.session?.sessionData.movieId,
    sessionState?.session?.sessionData?.startDate,
  ]);

  return (
    <SessionForm
      title='Update session'
      modalType={modalType}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      handleCancel={handleCloseModal}
      sessionState={sessionState}
      validationSchema={sessionUpdateValidationSchema}
    />
  );
}
