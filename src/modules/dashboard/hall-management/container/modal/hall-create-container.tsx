import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import hallValidationSchema from "@/modules/dashboard/hall-management/utils/hall-validation-schema";
import { HallFieldsType } from "@/modules/dashboard/hall-management/types/hall-field-types";
import { hallCreateAsync } from "@/modules/dashboard/hall-management/action";
import HallForm from "@/modules/dashboard/hall-management/component/hall-form";
import { HallFields } from "@/modules/dashboard/hall-management/constants/hall-field-values";

export default function HallCreateContainer({ handleCloseModal }) {
  const dispatch = useAppDispatch();
  const hallState = useAppSelector((x) => x.hall_management_reducer);

  const [wasCreated, setWasCreated] = useState(false);
  const handleSubmit = async (values: HallFieldsType) => {
    if (await hallValidationSchema.isValid(values)) {
      await dispatch(hallCreateAsync(values));
      setWasCreated(true);
    }
  };

  useEffect(() => {
    if (
      hallState?.loadingStatusCreate === LOADING_STATUSES.IDLE &&
      wasCreated
    ) {
      handleCloseModal();
    }
  }, [hallState?.loadingStatusCreate, handleCloseModal, wasCreated]);

  return (
    <HallForm
      title='Create hall'
      initialValues={HallFields}
      handleSubmit={handleSubmit}
      handleCancel={handleCloseModal}
      hallState={hallState}
    />
  );
}
