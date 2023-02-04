import CinemasComponent from "@/modules/cinemas/component";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import { SelectChangeEvent } from "@mui/material";
import { HallFieldsType } from "@/modules/dashboard/hall-management/types/hall-field-types";

export interface CinemaContainerProps {
  values: HallFieldsType;
  setFieldValue: any;
}

export default function CinemasContainer({ values, setFieldValue }: CinemaContainerProps) {
  const cinemasState = useAppSelector((x) => x.cinemas_reducer);

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue("cinemaId", event.target.value);
  };

  return (
    <CinemasComponent values={values} handleChange={handleChange} cinemasState={cinemasState} />
  );
}