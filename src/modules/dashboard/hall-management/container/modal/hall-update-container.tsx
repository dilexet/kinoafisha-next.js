import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import {
  HallFieldsType,
  SeatTypePriceFieldsType,
} from "@/modules/dashboard/hall-management/types/hall-field-types";
import { hallUpdateAsync } from "@/modules/dashboard/hall-management/action";
import hallValidationSchema from "@/modules/dashboard/hall-management/utils/hall-validation-schema";
import HallForm from "@/modules/dashboard/hall-management/component/hall-form";

export default function HallUpdateContainer({ handleCloseModal }) {
  const dispatch = useAppDispatch();
  const hallState = useAppSelector((x) => x.hall_management_reducer);

  const [initialValues, setInitialValues] = useState<HallFieldsType>(null);
  const [wasUpdated, setWasUpdated] = useState(false);

  const handleSubmit = async (values: HallFieldsType) => {
    if (await hallValidationSchema.isValid(values)) {
      await dispatch(hallUpdateAsync({ values: values, id: values.id }));
      setWasUpdated(true);
    }
  };

  useEffect(() => {
    if (
      hallState?.loadingStatusUpdate === LOADING_STATUSES.IDLE &&
      wasUpdated
    ) {
      handleCloseModal();
    }
  }, [hallState?.loadingStatusUpdate, handleCloseModal, wasUpdated]);

  useEffect(() => {
    if (
      !initialValues &&
      hallState?.loadingStatusGetOne === LOADING_STATUSES.IDLE
    ) {
      const seatTypePrices: SeatTypePriceFieldsType[] = [];
      hallState?.hall?.rows?.forEach((row) =>
        row?.seats?.forEach((seat) => {
          if (
            !seatTypePrices.find((x) => x.seatTypeId === seat?.seatType?.id)
          ) {
            seatTypePrices.push({
              seatTypeId: seat?.seatType?.id,
              price: seat?.price,
            });
          }
        }),
      );
      setInitialValues({
        id: hallState?.hall?.id,
        name: hallState?.hall?.name,
        cinemaId: hallState?.hall?.cinemaId,
        seatTypePrices: seatTypePrices,
        rows: hallState?.hall?.rows.map((row) => {
          return {
            numberRow: row?.numberRow,
            seats: row?.seats?.map((seat) => {
              return {
                numberSeat: seat?.numberSeat,
                seatTypeId: seat?.seatType?.id,
              };
            }),
          };
        }),
      });
    }
  }, [
    hallState?.hall?.cinemaId,
    hallState?.hall?.id,
    hallState?.hall?.name,
    hallState?.hall?.rows,
    hallState?.loadingStatusGetOne,
    initialValues,
  ]);

  return (
    <HallForm
      title='Update hall'
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      handleCancel={handleCloseModal}
      hallState={hallState}
    />
  );
}
