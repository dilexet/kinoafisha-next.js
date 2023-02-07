import CinemasComponent from "@/modules/cinemas/component";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import { SelectChangeEvent } from "@mui/material";
import { HallFieldsType } from "@/modules/dashboard/hall-management/types/hall-field-types";
import { SessionFieldsType } from "@/modules/dashboard/session-management/types/session-field-types";

export interface CinemaContainerProps {
  values: HallFieldsType | SessionFieldsType;
  setFieldValue: any;
  errors: any;
  touched: any;
  handleBlur: any;
}

export default function CinemasContainer({ values, setFieldValue, touched, handleBlur, errors }: CinemaContainerProps) {
  const cinemasState = useAppSelector((x) => x.cinemas_reducer);

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue("cinemaId", event.target.value);
  };

  return (
    <CinemasComponent values={values} handleChange={handleChange} cinemasState={cinemasState}
                      errors={errors} touched={touched}
                      handleBlur={handleBlur}
    />
  );
}