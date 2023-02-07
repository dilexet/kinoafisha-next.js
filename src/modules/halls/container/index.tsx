import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { SelectChangeEvent } from "@mui/material";
import HallsComponent from "@/modules/halls/component";
import { useCallback, useEffect, useState } from "react";
import { hallsGetAllAsync } from "@/modules/halls/action";
import { HallContainerProps } from "@/modules/halls/types/hall-props";

export default function HallsContainer({
  values,
  setFieldValue,
  handleBlur,
  errors,
  touched,
}: HallContainerProps) {
  const hallsState = useAppSelector((x) => x.halls_reducer);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue("hallId", event.target.value);
  };

  const fetchHalls = useCallback(
    async (cinemaId) => {
      await dispatch(hallsGetAllAsync(cinemaId));
    },
    [dispatch],
  );

  useEffect(() => {
    if (values?.hallId === "" && values?.cinemaId !== "") {
      fetchHalls(values?.cinemaId).catch(console.error);
    } else if (
      values?.hallId !== "" &&
      values?.cinemaId !== "" &&
      isLoading === true
    ) {
      fetchHalls(values?.cinemaId).catch(console.error);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [fetchHalls, isLoading, values?.cinemaId, values?.hallId]);

  return (
    <HallsComponent
      values={values}
      handleChange={handleChange}
      hallsState={hallsState}
      errors={errors}
      handleBlur={handleBlur}
      touched={touched}
    />
  );
}
