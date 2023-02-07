import CinemaForm from "@/modules/dashboard/cinema-management/component/cinema-form";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import {
  CinemaFieldType,
  CinemaFieldValues,
} from "@/modules/dashboard/cinema-management/constants/cinema-field-values";
import cinemaValidationSchema from "@/modules/dashboard/cinema-management/utils/cinema-validation-schema";
import { cinemaCreateAsync } from "@/modules/dashboard/cinema-management/action";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { textFields } from "@/modules/dashboard/cinema-management/constants/fields";

export default function CinemaCreateContainer({ handleCloseModal }) {
  const dispatch = useAppDispatch();
  const cinemaState = useAppSelector((x) => x.cinema_management_reducer);

  const [wasCreated, setWasCreated] = useState(false);
  const handleSubmit = async (values: CinemaFieldType) => {
    if (await cinemaValidationSchema.isValid(values)) {
      await dispatch(cinemaCreateAsync(values));
      setWasCreated(true);
    }
  };

  useEffect(() => {
    if (cinemaState?.loadingStatusCreate === LOADING_STATUSES.IDLE && wasCreated) {
      handleCloseModal();
    }
  }, [cinemaState?.loadingStatusCreate, handleCloseModal, wasCreated]);

  return (
    <CinemaForm title="Create cinema" initialValues={CinemaFieldValues}
                handleSubmit={handleSubmit}
                initializeTextField={textFields}
                handleCancel={handleCloseModal} cinemaState={cinemaState} />
  );
}