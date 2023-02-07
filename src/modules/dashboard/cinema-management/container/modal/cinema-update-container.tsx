import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import CinemaForm from "@/modules/dashboard/cinema-management/component/cinema-form";
import { useEffect, useState } from "react";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { CinemaFieldType } from "@/modules/dashboard/cinema-management/constants/cinema-field-values";
import cinemaValidationSchema from "@/modules/dashboard/cinema-management/utils/cinema-validation-schema";
import { cinemaUpdateAsync } from "@/modules/dashboard/cinema-management/action";
import { textFields } from "@/modules/dashboard/cinema-management/constants/fields";

export default function CinemaUpdateContainer({ handleCloseModal }) {
  const dispatch = useAppDispatch();
  const cinemaState = useAppSelector((x) => x.cinema_management_reducer);

  const [initialValues, setInitialValues] = useState<CinemaFieldType>(null);
  const [wasUpdated, setWasUpdated] = useState(false);
  const handleSubmit = async (values: CinemaFieldType) => {
    if (await cinemaValidationSchema.isValid(values)) {
      await dispatch(cinemaUpdateAsync({ id: values.id, values: values }));
      setWasUpdated(true);
    }
  };

  useEffect(() => {
    if (cinemaState?.loadingStatusUpdate === LOADING_STATUSES.IDLE && wasUpdated) {
      handleCloseModal();
    }
  }, [cinemaState?.loadingStatusUpdate, handleCloseModal, wasUpdated]);

  useEffect(() => {
    if (!initialValues && cinemaState?.loadingStatusGetOne === LOADING_STATUSES.IDLE) {
      setInitialValues({
        id: cinemaState?.cinema?.id,
        name: cinemaState?.cinema?.name,
        country: cinemaState?.cinema?.country,
        city: cinemaState?.cinema?.city,
        street: cinemaState?.cinema?.street,
        houseNumber: cinemaState?.cinema?.houseNumber,
      });
    }
  }, [cinemaState?.cinema?.city, cinemaState?.cinema?.country, cinemaState?.cinema?.houseNumber, cinemaState?.cinema?.id, cinemaState?.cinema?.name, cinemaState?.cinema?.street, cinemaState?.loadingStatusGetOne, initialValues]);

  return (
    <CinemaForm title="Update cinema" initialValues={initialValues} handleSubmit={handleSubmit}
                initializeTextField={textFields} handleCancel={handleCloseModal} cinemaState={cinemaState} />
  );
}